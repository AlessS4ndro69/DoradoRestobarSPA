import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { NavLink } from "react-router"
import { Button } from "./ui/button"
import { ShoppingCart, UtensilsCrossed } from 'lucide-react';
import { useCartStore } from "@/store/useCartStore";


export default function TopNavBar(){
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="hidden md:flex sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 font-bold text-xl text-orange-600">
          <UtensilsCrossed /> Dorado Restobar
        </NavLink>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <NavLink to="/" end>
                Inicio
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <div className="flex items-center gap-4 ml-auto">
            <Button variant="ghost" size="icon" asChild>
              <NavLink to="/cart">
                <ShoppingCart className="h-5 w-5" />
               {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </NavLink>
            </Button>
            
            {/* <Button variant="ghost" size="icon" asChild>
              <NavLink to="/profile">
                <User className="h-5 w-5" />
              </NavLink>
            </Button> */}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      </div>
    </header>
  )
}