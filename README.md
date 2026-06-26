LetMeCook uses Daytona to build one thing multiple diferent ways as if they're cooking a soup.

**The user experience (worflow):**
1.  We start with llm chat on the right and our couldrons on the left. 
2. The users tells the chat: "i wanna build a marketplace for lawn mowers" The chat breaks it down into components and options:
- you need Image/file storage. You can use:  Cloudinary or S3 or Supabase Storage
- you need Search. You can use: Algolia or  Typesense or Postgres
- you need a Style. It can be: minimal, flashy or balanced.
4. The options like "Algolia", "minimal", "Typesense" are highlighted with colorful rectangles. You can drag and drop each one individually and put it in a couldron on the left. you can put different combinations in different couldrons. 
5. When you have them all, you just click a "Play" buttton under it. The agent then builds the project in a daytona container using the options that you specified. It tells you when it's done.
6. You can make and launch more couldrons while the one is building. Each couldron is a new Daytona container.
