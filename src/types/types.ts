/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Prisma } from "@prisma/client";
import type { Session } from "next-auth";
import type { ColDef } from "ag-grid-community";
import { z } from "zod";

export const addPostSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "max title lenght 100"),
  content: z.string().min(10, "content must be at least 10 characters"),
});

export const addCommentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
});

// MAIN

export interface MainPostProps {
  post: {
    id: number;
    title: string;
    content: any;
    createdAt: Date;
    createdBy: {
      name: string;
      image: string;
    };
  },
  postsLength: number | undefined,
  fetchNextFn: () => void
}

export interface MainPostsSkeleton {
  isFetched: boolean;
}

//

// DROPDOWN

export interface ModalLogout {
  isOpen: boolean | undefined;
  onOpenChange: ((isOpen: boolean) => void) | undefined;
}

export interface MainDropDown {
  userName: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
}

//

// NAVBAR

export interface NavNavbar {
  session: Session | null;
}

export interface NavUser {
  session: Session | null;
}

export interface UserInfo {
  session: Session | null;
}

type BurgerItems = {
  name: string;
  href?: string;
  type: "link" | "admin";
};

export type Burger = BurgerItems[];

//

// ADMIN DASHBOARD

export interface AdminPosts {
  id: number;
  title: string;
  content: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
  createdBy: {
    name: string;
  };
}

export interface AdminUsers {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User";
  emailVerified: Date | null;
  image: string;
}

//

export interface Comment {
  postId: number;
  post: {
    comments: {
      content: string;
      id: number;
      createdAt: Date;
      author: {
        name: string;
        image: string;
      };
    }[];
    title: string;
    content: Prisma.JsonValue;
    createdBy: {
      name: string;
      image: string;
    };
  };
}

// PROFILE
export interface Profile {
  params: {
    name: string;
  };
}

export interface ProfileUser {
  user: {
    id: string;
    name: string;
    image: string;
    description: string | null;
  } | null;
  session: Session | null;
}
//

export type JsonObject = { [Key in string]?: JsonValue };
export type JsonArray = JsonValue[];
export type JsonValue =
  | string
  | number
  | boolean
  | JsonObject
  | JsonArray
  | null
  | Node;

export interface TextNode {
  type: "text";
  text: string;
}

export interface ParagraphNode {
  type: "paragraph";
  content?: Array<Node>;
}

export interface BlockquoteNode {
  type: "blockquote";
  content?: Array<Node>;
}

export interface DocumentNode {
  type: "doc";
  content: Array<Node>;
}

export interface CodeNode {
  type: "codeBlock";
  attrs: {
    language: string | null;
  };
  content: Array<TextNode>;
}

export interface listItem {
  type: "listItem";
  content: Array<Node>;
}

export interface orderedList {
  type: "orderedList";
  attrs: {
    start: number;
  };
  content: Array<Node>;
}

export interface img {
  type: "image",
  attrs: {
    alt: string,
    src: string,
    title: string
  }
}

export type Node = 
  | TextNode
  | ParagraphNode
  | BlockquoteNode
  | DocumentNode
  | CodeNode
  | orderedList
  | listItem
  | img

export type ColDefHelper<T> = ColDef<T>[];
