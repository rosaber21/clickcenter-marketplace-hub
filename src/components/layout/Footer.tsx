
import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t py-8 bg-muted/40">
      <div className="container space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link 
              to="/" 
              className="flex items-center text-2xl font-bold"
            >
              <span className="text-primary">Click</span>
              <span className="text-secondary">Center</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A melhor plataforma para hospedagem e venda de produtos digitais e físicos.
            </p>
          </div>
          
          <div>
            <h5 className="font-medium mb-3">Produtos</h5>
            <ul className="space-y-2">
              <li><Link to="/produtos" className="text-sm text-muted-foreground hover:text-foreground">Destaques</Link></li>
              <li><Link to="/produtos/digitais" className="text-sm text-muted-foreground hover:text-foreground">Digitais</Link></li>
              <li><Link to="/produtos/fisicos" className="text-sm text-muted-foreground hover:text-foreground">Físicos</Link></li>
              <li><Link to="/produtos/novos" className="text-sm text-muted-foreground hover:text-foreground">Lançamentos</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium mb-3">Suporte</h5>
            <ul className="space-y-2">
              <li><Link to="/ajuda" className="text-sm text-muted-foreground hover:text-foreground">Ajuda</Link></li>
              <li><Link to="/contato" className="text-sm text-muted-foreground hover:text-foreground">Contato</Link></li>
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link></li>
              <li><Link to="/termos" className="text-sm text-muted-foreground hover:text-foreground">Termos de Uso</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium mb-3">Conta</h5>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">Entrar</Link></li>
              <li><Link to="/cadastro" className="text-sm text-muted-foreground hover:text-foreground">Cadastre-se</Link></li>
              <li><Link to="/afiliados" className="text-sm text-muted-foreground hover:text-foreground">Programa de Afiliados</Link></li>
              <li><Link to="/criadores" className="text-sm text-muted-foreground hover:text-foreground">Seja um Criador</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-muted">
          <p className="text-sm text-muted-foreground">
            © 2025 ClickCenter. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Fundadores: Mário & Rosy
          </p>
        </div>
      </div>
    </footer>
  );
}
