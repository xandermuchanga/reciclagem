
import { useState } from "react";
import { Link } from "react-router-dom";
import { Recycle, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Mock authenticated state for now
  const isAuthenticated = false;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Recycle className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">
            Reciclagem Sustentavel
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Início
          </Link>
          <Link to="/map" className="text-foreground hover:text-primary transition-colors">
            Mapa
          </Link>
          <Link to="/listings" className="text-foreground hover:text-primary transition-colors">
            Anúncios
          </Link>
          <Link to="/schedule" className="text-foreground hover:text-primary transition-colors">
            Agendamentos
          </Link>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Meu Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/messages">Mensagens</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Cadastrar</Link>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-card p-4 border-t border-border">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="block p-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                onClick={toggleMenu}
              >
                Início
              </Link>
            </li>
            <li>
              <Link
                to="/map"
                className="block p-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                onClick={toggleMenu}
              >
                Mapa
              </Link>
            </li>
            <li>
              <Link
                to="/listings"
                className="block p-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                onClick={toggleMenu}
              >
                Anúncios
              </Link>
            </li>
            <li>
              <Link
                to="/schedule"
                className="block p-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                onClick={toggleMenu}
              >
                Agendamentos
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="block p-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                    onClick={toggleMenu}
                  >
                    Meu Perfil
                  </Link>
                </li>
                <li>
                  <Link
                    to="/messages"
                    className="block p-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                    onClick={toggleMenu}
                  >
                    Mensagens
                  </Link>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={toggleMenu}
                  >
                    Sair
                  </Button>
                </li>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" asChild>
                  <Link to="/login" onClick={toggleMenu}>
                    Entrar
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/register" onClick={toggleMenu}>
                    Cadastrar
                  </Link>
                </Button>
              </div>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
