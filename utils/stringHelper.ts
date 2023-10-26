export function capitalizeFirstChar(str: string): string {
  if (!str) {
    throw new Error(
      "Input string is empty or falsy. Please provide a valid string."
    );
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function shortenString(str: string) {
  if (str.length > 24) {
    return str.slice(0, 21) + "...";
  } else {
    return str;
  }
}
