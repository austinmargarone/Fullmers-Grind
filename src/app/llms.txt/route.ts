export async function GET() {
  const content = `# Your Site Name

> A brief description of what your site is about.

## Pages

- [Home](https://fullmersgrind.com/): Main landing page


## Contact

- Email: fullmersgrind@yahoo.com
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
