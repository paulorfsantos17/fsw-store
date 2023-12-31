"use client";
import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { signIn, useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "./avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "./separator";
import Link from "next/link";
import Cart from "./cart";

const Header = () => {
  const handleLoginClick = async () => {
    await signIn();
  };
  const handleLogoutClick = async () => {
    await signOut();
  };
  const { status, data } = useSession();

  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="text-left  text-lg font-semibold">
            Menu
          </SheetHeader>

          <div className="mt-2 flex  flex-col gap-2">
            {status === "unauthenticated" && (
              <Button
                onClick={handleLoginClick}
                variant="outline"
                className="flex w-full justify-start gap-2"
              >
                <LogInIcon size={16} />
                Fazer login
              </Button>
            )}
            {status === "authenticated" && data?.user && (
              <>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 py-4">
                    <Avatar>
                      <AvatarFallback>
                        {data.user.name?.[0].toUpperCase()}
                      </AvatarFallback>
                      {data.user.image && <AvatarImage src={data.user.image} />}
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="font-medium">{data.user.name}</p>
                      <p className="text-sm opacity-75">Boas compras!</p>
                    </div>
                  </div>
                  <Separator />
                </div>
                <Button
                  variant="outline"
                  className="flex w-full justify-start gap-2"
                  onClick={handleLogoutClick}
                >
                  <LogOutIcon size={16} />
                  Fazer Logout
                </Button>
                <SheetClose asChild>
                  <Link href="/orders">
                    <Button
                      variant="outline"
                      className="flex w-full justify-start gap-2"
                    >
                      <ListOrderedIcon size={16} />
                      Meus Peidos
                    </Button>
                  </Link>
                </SheetClose>
              </>
            )}
            <SheetClose asChild>
              <Link href="/">
                <Button
                  variant="outline"
                  className="flex w-full justify-start gap-2"
                >
                  <HomeIcon size={16} />
                  Home
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/deals">
                <Button
                  variant="outline"
                  className="flex w-full justify-start gap-2"
                >
                  <PercentIcon size={16} />
                  Ofertas
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/catalog">
                <Button
                  variant="outline"
                  className="flex w-full justify-start gap-2"
                >
                  <ListOrderedIcon size={16} />
                  Catálogo
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/">
        <h1 className="text-lg font-semibold">
          <span className="text-primary">FSW</span> Store
        </h1>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <ShoppingCartIcon />
          </Button>
        </SheetTrigger>

        <SheetContent className="w-[85%]">
          <Cart />
        </SheetContent>
      </Sheet>
    </Card>
  );
};

export default Header;
