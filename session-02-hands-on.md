# Session 2, hands-on: build DemoKart yourself

AI Residency, Goa. Day 2, Sat 21 Nov, 11:30 to 13:00. Run by Mohit.

Deepak built DemoKart live in the first session. Now every participant builds the same shop on their own laptop, from an empty folder, using the four prompts in [`prompts.md`](./prompts.md).

**Goal for the room:** by 13:00, everyone has a working DemoKart on localhost with search, filter, sort and a cart, and its code in their own private GitHub repo.

## Running order

| Time | Step | Checkpoint (hands up when done) |
|------|------|---------------------------------|
| 11:30 | 0. Welcome and setup check | `node -v` and `gh auth status` both work |
| 11:40 | 1. Prompt 1: Setup | 15 products on localhost |
| 12:05 | 2. Prompt 2: Filters | Category, sort and search work together |
| 12:20 | 3. Prompt 3: Cart | Add to cart works and the cart survives a reload |
| 12:40 | 4. Prompt 4: GitHub | Private repo on GitHub with your code |
| 12:55 | 5. Share and wrap-up | Repo link posted in Slack |

If you finish a step early, wait for the checkpoint or help the person next to you. Do not skip ahead, because each prompt builds on the one before.

## Step 0. Welcome and setup check (11:30, 10 min)

**Say**
- You will do exactly what Deepak did: paste a prompt, watch Claude Code work, check the result, then move on.
- Your result will not look identical to his. Claude Code makes small choices differently each time. That is normal. What matters is that it meets the checks for each step.
- Read each command Claude Code asks to run before you approve it. If you do not understand one, ask me.

**Everyone does**
1. Create an empty folder called `demokart-shop` (lowercase, nothing inside).
2. Open it in VS Code and start Claude Code in the terminal.
3. Open `prompts.md` from the repo or Slack so you can copy the prompts.
4. Check the tools: run `node -v` (20 or higher) and `gh auth status` (shows "Logged in"). If `gh` is not logged in, run `gh auth login` and choose GitHub.com, HTTPS, Login with a web browser.

**Mohit:** walk the room. Anyone whose check fails gets fixed now, not later.

## Step 1. Prompt 1: Setup (11:40, 25 min)

**Do:** copy Prompt 1 from `prompts.md` and paste it into Claude Code. Approve the commands it asks for.

**Check before you raise your hand**
- `localhost:3000` (or the link the terminal prints) shows the DemoKart home page.
- There are 15 products with photos, prices, a struck-through original price and a green "% off" tag.
- The header is sticky, with the DemoKart name, a search box and a cart icon.
- The page looks fine when you make the browser window narrow.

**Common problems**

| Problem | Fix |
|---------|-----|
| Setup stops and asks a question | Tell Claude Code: "Use the non-interactive options and the default answers." |
| "Folder not empty" or a name error | The folder must be empty and its name lowercase. |
| Port 3000 is busy | Open the link the terminal prints, often `localhost:3001`. |
| A photo does not show | The prompt adds a fallback image. Or ask: "Check the image links and use the placehold.co fallback." |
| Build or lint error | Copy the red error into Claude Code and say: "Fix this error." |

**Mohit:** while they wait for Claude Code, remind people to read the product card and notice how each detail came from one line of the prompt.

## Step 2. Prompt 2: Filters (12:05, 15 min)

**Do:** paste Prompt 2.

**Check**
- Pick Electronics: only electronics show. Pick All: everything shows.
- Sort Low to high: prices go up. Sort High to low: prices go down.
- Combine them: Fashion + Low to high shows only Fashion, cheapest first.
- Type in the search box: the list and the "Showing N products" count both change.
- A search with no match shows "No products found" and a Clear filters button that resets everything.

**Ask Claude Code:** "In 3 lines, explain how the filter and sort work." Read the answer. This is how you learn from code you did not write.

**Common problems**

| Problem | Fix |
|---------|-----|
| Sort changes the order but the filter stops working | Ask: "Category filter, sort and search must all work together. Filter and search first, then sort." |
| Page reloads when you click a pill | Ask: "The filter must update instantly without a page reload." |

## Step 3. Prompt 3: Cart (12:20, 20 min)

**Do:** paste Prompt 3.

**Check**
- Click Add to cart: the button shows "Added ✓" for a moment and a toast appears at the bottom.
- The cart badge in the header counts up.
- Add the same product twice: its quantity goes to 2, not two separate lines.
- Open `/cart`: you see each item with its image, quantity buttons, line total and Remove, plus the total in ₹.
- **Reload the page: the cart is still there.**
- Open the site in a second tab, change the cart, and the first tab updates.
- Clear cart asks for confirmation. An empty cart shows "Your cart is empty".

**Think about it (2 min, pair up):** open the site in a private window. Why is the cart empty there? Where is the cart actually stored? (Answer: in this one browser, in localStorage. Another browser or laptop cannot see it.)

**Common problems**

| Problem | Fix |
|---------|-----|
| Hydration warning or a flash of "Your cart is empty" | Ask: "Fix the hydration warning. The cart must load from localStorage only after the first render." |
| The badge does not update | Ask Claude Code to check that the app is wrapped in the CartContext provider in `app/layout.js`. |
| Cart is lost on reload | Ask: "The cart must be saved to localStorage under the key demokart-cart and loaded back on page load." |

## Step 4. Prompt 4: GitHub (12:40, 15 min)

**Say**
- Git saves versions of your code on your laptop. Each saved version is a commit.
- GitHub keeps a copy online.
- `.gitignore` lists what must never be saved, such as `node_modules` and `.env` files.

**Do:** paste Prompt 4.

**Check**
- Claude Code explained Git, a commit and GitHub in 3 lines.
- It created a **private** repo called `demokart-shop` on your account and pushed.
- The reply ends with "Pushed successfully" and a repo link.
- Open the link in your browser (you must be logged in to GitHub). You can see your files and the commit message.
- `node_modules` and `.env` files are **not** in the repo.

**Common problems**

| Problem | Fix |
|---------|-----|
| "Not logged in" from `gh` | Run `gh auth login` in the terminal, sign in through the browser, then ask Claude Code to try again. |
| Repo name is taken | Ask for `demokart-shop-2`. |
| git user name or email is not set | Claude Code stops on purpose. Run `git config --global user.name "Your Name"` and `git config --global user.email "you@example.com"`, then continue. |

## Step 5. Share and wrap-up (12:55, 5 min)

**Everyone:** post your repo link in Slack. The link only opens for you while you are logged in, because the repo is private.

**Say**
- What you did: from an empty folder to a working shop with its code on GitHub, in four prompts.
- The skill is not the prompts themselves. It is describing what you want clearly, checking the result, and asking Claude Code to fix what is wrong.
- Next steps, in later sessions: putting the shop live on the internet, and moving products and carts into a database.

## Done when

- The shop runs on localhost with 15 products.
- Search, category filter and price sort work together.
- Add to cart works, and the cart survives a reload.
- The code is in a private GitHub repo.
- The repo link is posted in Slack.

## Finished early

Pick one feature. Describe it to Claude Code in a prompt of your own, check that it works, then ask Claude Code to commit and push it to GitHub.

- A product detail page that opens when you click a card.
- Sort by rating.
- A Checkout button that shows an order summary, with no payment.
- A wishlist heart on each product card.

## Facilitator notes (Mohit)

- If a participant is more than one checkpoint behind, pair them with someone who is ahead. Do not let anyone sit stuck for more than 5 minutes without asking.
- If someone's build is badly broken, they can start the step again: ask Claude Code to "undo the last change" or start over from the last working step.
- Prompts take a few minutes to run. Use that time to walk the room, not to talk to the whole room.
- Keep a list of the errors you see most often. They are good material for the next session.
