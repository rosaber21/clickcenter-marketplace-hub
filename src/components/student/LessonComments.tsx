import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp } from "lucide-react";

interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  content: string;
  date: string;
  likes: number;
}

interface LessonCommentsProps {
  lessonId: string;
  comments: Comment[];
  liked: boolean;
  onLikeToggle: () => void;
}

export function LessonComments({ 
  lessonId, 
  comments: initialComments,
  liked,
  onLikeToggle
}: LessonCommentsProps) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(initialComments);
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      userName: "João Silva", // This would come from the user's session
      userAvatar: "https://i.pravatar.cc/150?img=12",
      content: newComment,
      date: new Date().toISOString(),
      likes: 0
    };
    
    setComments([...comments, comment]);
    setNewComment("");
  };
  
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: ptBR
      });
    } catch (e) {
      return dateString;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Comentários e Feedback</CardTitle>
        <Button
          variant={liked ? "default" : "outline"}
          size="sm"
          className="gap-1.5"
          onClick={onLikeToggle}
        >
          <ThumbsUp className="h-4 w-4" />
          {liked ? "Curtido" : "Curtir Aula"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Add new comment */}
          <div className="space-y-4">
            <Textarea
              placeholder="Deixe um comentário ou dúvida sobre esta aula..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-24"
            />
            <div className="flex justify-end">
              <Button onClick={handleAddComment}>
                Enviar Comentário
              </Button>
            </div>
          </div>
          
          {/* Existing comments */}
          {comments.length > 0 ? (
            <div className="space-y-6 pt-4 border-t">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                    <AvatarFallback>
                      {comment.userName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{comment.userName}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(comment.date)}</p>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                    <div className="flex items-center gap-6 pt-2">
                      <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                        <ThumbsUp className="h-3.5 w-3.5" />
                        {comment.likes > 0 ? comment.likes : "Curtir"}
                      </button>
                      <button className="text-xs text-muted-foreground hover:text-foreground">
                        Responder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Seja o primeiro a comentar nesta aula!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
