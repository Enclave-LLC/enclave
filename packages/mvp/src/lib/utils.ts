import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
* Converts a Google Drive file link to a direct image link for use in HTML img tags.
*
* @param googleDriveLink - The original Google Drive file link.
* @returns The direct image link.
*/
export function getDirectImageLink(googleDriveLink: string): string {
 const url = new URL(googleDriveLink)
 const fileId = url.searchParams.get("id")

 if (fileId) {
   return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
 }

 return ""
}