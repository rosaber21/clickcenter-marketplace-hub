
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Play, Pause, Settings, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  title: string;
  videoUrl: string;
  onComplete: () => void;
}

export function VideoPlayer({ title, videoUrl, onComplete }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [quality, setQuality] = useState("HD");
  
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      
      // Mark as completed when 90% of video is watched
      if (!videoRef.current.paused && 
          (videoRef.current.currentTime / videoRef.current.duration) >= 0.9) {
        onComplete();
      }
    }
  };
  
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleQualityChange = (newQuality: string) => {
    setQuality(newQuality);
    setShowQualityMenu(false);
    // In a real implementation, this would switch video sources
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 relative">
        <div className="relative bg-black">
          <video
            ref={videoRef}
            className="w-full aspect-video"
            src={videoUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onClick={togglePlay}
          />
          
          {/* Big play button overlay when paused */}
          {!isPlaying && (
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={togglePlay}
            >
              <div className="rounded-full bg-primary/80 p-4">
                <Play className="h-12 w-12 text-white" />
              </div>
            </div>
          )}
          
          {/* Video controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
            <h3 className="text-lg font-semibold mb-2 line-clamp-1">{title}</h3>
            
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
              <span className="text-xs whitespace-nowrap">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20 p-1 h-auto"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </Button>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white hover:bg-white/20 p-1 h-auto"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </Button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                </div>
                
                <Button 
                  type="button" 
                  onClick={onComplete} 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20 p-1 h-auto flex items-center gap-1"
                >
                  <Check size={16} /> Concluir
                </Button>
              </div>
              
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 p-1 h-auto"
                  onClick={() => setShowQualityMenu(!showQualityMenu)}
                >
                  <Settings size={20} />
                  <span className="ml-1 text-xs">{quality}</span>
                </Button>
                
                {showQualityMenu && (
                  <div className="absolute bottom-8 right-0 bg-black/90 rounded shadow-lg p-2 min-w-32 z-10">
                    {["4K", "HD", "720p", "480p", "360p"].map((q) => (
                      <button
                        key={q}
                        className={`block w-full text-left px-3 py-1.5 text-sm rounded hover:bg-white/10 ${q === quality ? 'bg-white/20' : ''}`}
                        onClick={() => handleQualityChange(q)}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
