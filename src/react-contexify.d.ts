// filepath: /home/davide/github/like-anki/src/react-contexify.d.ts
declare module "react-contexify" {
    import * as React from "react";
  
    export interface MenuProps {
      id: string;
      animation?: string;
      theme?: string;
      children?: React.ReactNode;
    }
  
    export interface ItemProps {
      onClick?: (args: any) => void;
      children?: React.ReactNode;
    }
  
    export const Menu: React.FC<MenuProps>;
    export const Item: React.FC<ItemProps>;
    export const useContextMenu: (args: { id: string }) => { show: (args: { event: React.MouseEvent }) => void };
  }