# DemoKart Prompts: Build and Ship an Online Shop with AI

These are the five prompts used to build DemoKart, a small online shop. Paste them into Claude Code **one at a time, in order**. Each one builds on the one before it.

| # | Prompt | What you get |
|---|--------|--------------|
| 1 | Setup | A Next.js app with a polished home page and 15 products |
| 2 | Filters | Category filter and price sort |
| 3 | Cart | A working shopping cart that remembers items |
| 4 | GitHub | Your code saved online in a private repo |
| 5 | Vercel | Your shop live on the internet ([see the live demo](https://demokart-masai.vercel.app/)) |

**Before you start:** you need Node.js, Git, the GitHub CLI (`gh`) and a GitHub account. Wait for each prompt to finish and check the result before pasting the next.

---

## Prompt 1: Setup

**Goal:** create the app and build the home page.

```text
Create a new Next.js app in this empty folder.
Use JavaScript (not TypeScript), the App Router and Tailwind CSS.
Use non-interactive options so setup does not stop to ask questions, for example:
npx create-next-app@latest . --js --app --tailwind --eslint --no-src-dir --import-alias "@/*" --use-npm --yes

Then build a polished, market-ready home page for an online shop called DemoKart.
It should look like a real e-commerce brand, not a tutorial project.

DATA
Put 15 realistic products in data/products.js. Each product has:
- id
- name
- category (Electronics, Fashion, Home or Books)
- price in rupees (a whole number between 199 and 49999)
- originalPrice (higher than price, shown with a strikethrough)
- rating (3.8 to 4.9)
- reviews (a count between 20 and 5000)
- badge (optional: "Bestseller", "New" or "Sale")
- image

Rules for the products:
- Use realistic names, for example "Noise-Cancelling Wireless Headphones",
  "Cotton Oxford Shirt", "Ceramic Pour-Over Coffee Set", "Atomic Habits Paperback".
- Spread them across all four categories, with at least 3 in each.
- For images, use a real Unsplash photo that matches the product:
  https://images.unsplash.com/photo-<id>?auto=format&fit=crop&w=600&h=600&q=80
  Make sure every URL works and shows the right item. If you cannot verify a photo,
  use https://placehold.co/600x600/png?text=Product+Name for that product.

IMAGES
- Use plain <img> tags, not next/image.
- Add loading="lazy", a meaningful alt text, and a fixed square shape
  (aspect-square, object-cover) so the grid never jumps around.
- Add an onError handler that swaps in the placehold.co fallback image.

PAGE LAYOUT
- Header: sticky, white background, with a subtle shadow or border.
  - DemoKart logo/wordmark on the left.
  - Search box in the centre (visible on desktop, collapsed on mobile).
  - Cart and account icons on the right.
- Hero banner under the header: a bold headline, a one-line subheading, a
  "Shop now" button and a clean gradient background. Keep it compact, not full-screen.
- Category filter bar: pill buttons for All, Electronics, Fashion, Home and Books.
  Clicking one filters the grid. This needs a client component with useState.
  Highlight the active pill.
- Search: filter products by name as the user types.
- Product grid: 1 column on small phones, 2 on mobile, 3 on tablet, 4 on desktop,
  with comfortable gaps.
- Footer: simple, with columns for Shop, Support and Company, plus a copyright line.

PRODUCT CARD
- Rounded corners, soft shadow, a small lift on hover and a slight image zoom.
- The badge sits in a corner of the image.
- Category label in small, muted, uppercase text.
- Product name limited to 2 lines.
- Star rating with the review count.
- Price in bold with the ₹ symbol and Indian number formatting (toLocaleString('en-IN')).
- Original price struck through in grey.
- A green "% off" tag calculated from the two prices.
- An "Add to cart" button.

BEHAVIOUR
- The cart count in the header goes up when "Add to cart" is clicked
  (simple client-side state, no backend).
- Show a friendly "No products found" message when a filter or search returns nothing.

STYLE
- Clean and modern, with lots of whitespace.
- One accent colour (for example indigo or orange) plus neutral greys.
- Inter or a system font, with consistent spacing.
- Fully responsive and accessible: visible focus states, aria-labels on icon-only
  buttons, and enough colour contrast.

CODE
- Set the page title and meta description in app/layout.js.
- Split the code into components in a components/ folder:
  Header, Hero, CategoryFilter, ProductCard, ProductGrid and Footer.

WHEN DONE
Run the build or lint to check for errors, start the dev server, and give me the local link.
```

---

## Prompt 2: Filters

**Goal:** let shoppers narrow down and sort the products.

```text
Extend the existing DemoKart home page with a category filter and a price sort
that work together and update the product grid instantly, with no page reload.
Keep the current design, components, search box and cart behaviour working as they are.

FUNCTIONALITY
- Category filter: pill buttons for All, Electronics, Fashion, Home and Books.
  "All" is selected by default. Clicking a pill shows only products in that category.
- Sort by price: a native <select> dropdown with these options:
  - "Featured" (the original order from data/products.js, and the default)
  - "Price: Low to high"
  - "Price: High to low"
- The two controls must work together. Example: Fashion + Price: Low to high shows
  only Fashion products, cheapest first. Changing one control keeps the other's choice.
- The search box must also work with both: filter by category and search text first,
  then sort the result.
- Put the logic in one client component ("use client"):
  - Use useState for selectedCategory and sortOrder.
  - Use useMemo to work out which products are visible.
  - Never change the original array. Copy it with [...products] before calling sort.
  - Sort by the numeric price field, not the formatted text.
- Show a live result count above the grid, for example "Showing 6 products".
  Use "1 product" (singular) when there is only one.
- If nothing matches, show a friendly "No products found" message with a
  "Clear filters" button that resets category, sort and search.

UI
- Put the category pills and the sort dropdown on one row below the hero:
  pills on the left, dropdown on the right.
- On mobile, the pills scroll sideways (no wrapping, hidden scrollbar) and the
  dropdown sits on its own line below, full width.
- The active pill uses the accent colour with white text. Inactive pills are white
  with a grey border and a hover state.
- Accessibility:
  - A visible focus ring on every control.
  - aria-pressed on the pills.
  - An aria-label on the sort select.
  - Wrap the result count in aria-live="polite" so screen readers announce changes.
- Add a short fade or transition when the grid updates, and make sure the layout
  does not jump.

CODE
- Keep the components split as before: CategoryFilter, SortSelect, ProductGrid and
  ProductCard in components/.
- The parent client component owns the state and passes it down as props.
- Keep the category list and sort options as constants at the top of the file so
  they are easy to change.

WHEN DONE
Run lint or build to check for errors, make sure the dev server is running, and give
me the local link. Then tell me how you tested the combinations (for example
Books + High to low, All + Low to high, and Clear filters).
```

---

## Prompt 3: Cart

**Goal:** add a real cart that remembers what you added, even after a refresh.

```text
Add a working cart to the existing DemoKart app. Keep the current design, filters,
sort, search and components working as they are.
The cart lives in the browser using localStorage for now (no backend, no login).

CART STATE
- Create a CartContext in context/CartContext.js (a client component with "use client").
  It holds the cart and provides:
  items, itemCount, total, addToCart(id), increaseQty(id), decreaseQty(id),
  removeFromCart(id) and clearCart().
  Wrap the app in this provider from app/layout.js.
- Save only { id, quantity } for each item in localStorage under the key "demokart-cart".
  Do not save names or prices. Look up product details in data/products.js by id when
  showing the cart, so prices are always current.
- Adding a product that is already in the cart increases its quantity by 1 instead of
  creating a duplicate line. Limit quantity to 10 per product. Decreasing from 1
  removes the item.
- Avoid hydration errors:
  - Start with an empty cart on the server and on the first render.
  - Then load from localStorage inside a useEffect and set an isLoaded flag.
  - Only save back to localStorage after isLoaded is true, so the saved cart is never
    overwritten by the empty starting state.
- Wrap every localStorage read and write in try/catch. Check the loaded data (an array
  of objects with a valid id and a positive whole-number quantity) and quietly drop
  entries whose product no longer exists.
- Keep tabs in sync by listening to the window "storage" event, so a change in one
  tab updates the others.

PRODUCT CARDS
- After "Add to cart" is clicked, the button shows "Added ✓" for about 1.5 seconds
  (disabled during that time), then goes back to normal.
- If the item is already in the cart, show a small "In cart: 2" note on the card.
- Show a small toast at the bottom of the screen saying "Added to cart" with a
  "View cart" link. It disappears after 3 seconds. Use role="status" so screen
  readers announce it.

HEADER
- Show a cart icon with a count badge that links to /cart using next/link.
  - Hide the badge when the count is 0, and show "9+" above 9.
  - Give the link aria-label="Cart, N items".
  - The badge shows the total quantity across all items.
  - It must not flicker or cause a hydration warning on load, so render the badge
    only after isLoaded.

CART PAGE (app/cart/page.js)
- Make it a client component that uses the same Header and Footer as the home page.
- Each line item shows:
  - Product image (plain <img> with the same onError fallback as the cards)
  - Name and category
  - Unit price in ₹
  - Quantity control: – and + buttons with the number between them, with aria-labels
  - Line total (price × quantity) in ₹
  - A "Remove" button
- Summary panel (a sticky sidebar on desktop, below the list on mobile) showing the
  number of items, the subtotal and the Total in bold.
- Format all money in rupees with toLocaleString('en-IN'), for example ₹12,499.
- A "Checkout" button that is disabled and says "Coming soon" (as a tooltip or label).
- A "Clear cart" text button that asks for confirmation before clearing.
- Empty state: a friendly "Your cart is empty" message with an icon and a
  "Continue shopping" button that links to /.
- Show a skeleton or nothing (not the empty state) until isLoaded is true, so people
  with items never see a flash of "Your cart is empty".
- Add a "Continue shopping" link at the top of the page.
- Use the accent colour and spacing from the home page.
- Fully responsive: on mobile, line items stack with the image on the left and the
  controls underneath.

QUALITY
- Do not change state directly. Work out itemCount and total with reduce, using the
  items array and the product lookup.
- All buttons have visible focus rings, and icon-only buttons have aria-labels.
- Set the /cart page title to "Your cart | DemoKart" with a metadata export in a small
  server layout file (app/cart/layout.js), because the page itself is a client component.

WHEN DONE
Run lint or build to check for errors, make sure the dev server is running, and give me
the local link. Then tell me how you tested it:
- add the same product twice
- add different products
- reload the page and confirm the cart is still there
- remove an item
- change a quantity
- clear the cart
- open the site in a second tab and confirm the sync
```

---

## Prompt 4: GitHub

**Goal:** save your project online in a private GitHub repo.

**Before you start:** log in to GitHub from your terminal with `gh auth login`.

```text
Do the following in the DemoKart project folder.

First, explain in exactly 3 short lines, one each, for a beginner:
what Git is, what a commit is, and what GitHub is.
Use plain words and no jargon.

Then do these steps in order.

1. Check the .gitignore file.
   - Confirm it excludes node_modules, .next, and all environment files
     (.env, .env.local, .env.*.local). If any are missing, add them.
     Keep a .env.example tracked if one exists.
   - If this folder is not a Git repository yet, run git init and make sure the
     default branch is called main.
   - Run git status and check that no .env file, node_modules folder or build output
     is staged or already tracked. If any are, remove them from tracking with
     git rm --cached (without deleting the local files) before committing.

2. Commit all the work so far.
   - Check that git user.name and user.email are set. If they are not, stop and tell
     me. Do not invent values.
   - Stage everything and commit with a clear message in this style:
     "feat: build DemoKart storefront with product grid, category filter, price sort and localStorage cart"
   - Show me the commit hash and the number of files committed.

3. Create the GitHub repo and push.
   - Run gh auth status first. If I am not logged in, stop and tell me to run
     gh auth login, then wait. Do not try workarounds.
   - Create a private repo named demokart-shop on my personal account (not an
     organization) and push the code in one step:
     gh repo create demokart-shop --private --source=. --remote=origin --push
   - If a repo with that name already exists, do not overwrite it and never use a
     force push. Tell me and ask what to do.

4. Verify the push.
   - Run gh repo view demokart-shop --json url,visibility to confirm the repo exists
     and is PRIVATE.
   - Run git status -sb and git log origin/main -1 to confirm local main is up to date
     with GitHub and the latest commit is there.
   - Confirm in one line that node_modules and .env files were not pushed.

5. Give me the repo link. This must be the last thing in your reply.
   Only after the push is confirmed, end your reply with exactly this format. Put the
   full URL from gh repo view (https://github.com/<my-username>/demokart-shop) on its
   own line so it is clickable:

   ✅ Pushed successfully
   Repo: https://github.com/<my-username>/demokart-shop
   Visibility: Private
   Branch: main
   Latest commit: <short hash> - <commit message>

   - If any step failed, do not print a link. Instead say which step failed and why,
     in one plain sentence.
   - Remind me in one line that because the repo is private, the link only opens when
     I am logged in to my GitHub account.
```

---

## Prompt 5: Vercel

**Goal:** put your shop on the internet. GitHub is the single source of truth: whatever is on the `main` branch is what runs live.

**Live example:** this is what the finished shop looks like once deployed: https://demokart-masai.vercel.app/

**Before you start:** run `vercel login` in your own terminal (it opens a browser). Never paste a token into the chat.

```text
Deploy the DemoKart app to Vercel using the Vercel CLI, with GitHub as the single
source of truth. This means the code on the main branch of the GitHub repo
demokart-shop is exactly what runs in production.

Production deployments must come from a git push to main. Never use "vercel --prod"
from this machine, and never deploy uncommitted local files.

Do the following in the project folder, in order.

First, explain in 2 short lines for a beginner what Vercel is and what a "deployment"
is. Use plain words and no jargon.

1. Pre-checks (GitHub must match local).
   - Run npm run build and fix any errors before going further. Do not deploy a
     broken build.
   - Check whether any .env files are in the project. If they are, list the variable
     names (never the values) and tell me which ones Vercel will need. This app
     should not need any.
   - Run gh repo view demokart-shop --json url,visibility,defaultBranchRef to confirm
     the GitHub repo exists and its default branch is main.
   - Confirm the working tree is clean (git status), the current branch is main, and
     local main has the same latest commit as GitHub: run git fetch origin, then
     compare git rev-parse HEAD with git rev-parse origin/main. If they differ, or
     anything is uncommitted or unpushed, tell me and stop. Do not push anything on my
     behalf without telling me.

2. Set up the CLI.
   - Check if the Vercel CLI is available with vercel --version. If not, use
     npx vercel@latest for every command (do not install anything globally).
   - Run vercel whoami. If I am not logged in, stop and tell me to run vercel login in
     my own terminal (it opens a browser), then wait. Never ask me to paste a token
     into the chat, and never write a token to any file.

3. Link the project.
   - Run: vercel link --yes --project demokart-shop
   - Check that .vercel is listed in .gitignore (the CLI normally adds it). If it is
     not, add it, commit it and push it to main. Never commit the .vercel folder.

4. Connect GitHub (this is what makes GitHub the source of truth).
   - Run: vercel git connect
   - Then confirm the connected repo is demokart-shop and the Production Branch is
     main (check with vercel project inspect demokart-shop or the project's Git
     settings).
   - If it fails because the Vercel GitHub app is not installed or cannot see the
     private repo, stop and give me these exact browser steps:
       a. Open https://github.com/apps/vercel
       b. Click Install or Configure
       c. Choose my personal account
       d. Select "Only select repositories", pick demokart-shop, and save
     Then wait for me to say "done" and try once more. Do not retry in a loop.
   - If the CLI route still fails, give me this dashboard fallback: go to
     https://vercel.com/new, choose Import Git Repository, select demokart-shop, keep
     the detected Next.js settings, and click Deploy. Then continue from step 6.

5. Deploy from GitHub.
   - Do not run vercel --prod. Instead, trigger the deployment through GitHub:
     git commit --allow-empty -m "chore: trigger production deployment from GitHub"
     then git push origin main. Never force push.
   - Wait for the new production deployment to finish: run vercel ls and
     vercel inspect on the newest deployment every 15 seconds, for at most 5 minutes,
     until the status is Ready.
   - Confirm the deployment's Git commit matches the commit I just pushed (the commit
     SHA shown by vercel inspect should equal git rev-parse HEAD).
   - If the build fails, run vercel inspect --logs, read the error, fix the code,
     commit and push to main. Try at most 2 fixes, then stop and explain what is wrong.

6. Verify the live site.
   - Using curl, confirm that the production URL and the /cart page both return 200.
   - Confirm that the home page HTML contains "DemoKart".
   - Report that product images load. The app uses plain <img> tags with external
     image links, so no image domain settings are needed.

7. Optional preview check (only if I ask for it).
   - Create a branch called test-preview, push it, and confirm Vercel builds a preview
     deployment from it.
   - Preview URLs may be protected by Vercel login, so a 401 is expected and is not
     an error.
   - Then delete the test branch locally and on GitHub. Production must stay untouched.

8. Give me the result. This must be the last thing in your reply. Use exactly this format:

   🚀 Deployed from GitHub
   Live site: https://<production-url>
   Cart page: https://<production-url>/cart
   GitHub repo: https://github.com/<my-username>/demokart-shop
   Source of truth: GitHub, branch main
   Auto-deploy on push to main: Yes
   Deployed commit: <short hash> - <commit message>

   Use the real URLs from the CLI and gh output, each on its own line so they are
   clickable. If anything failed, do not print a link. Say which step failed and why,
   in one plain sentence.

Finish with three one-line reminders:
(1) From now on, change the site only by committing and pushing to GitHub. Do not run
    vercel --prod from a laptop, because that would deploy code that GitHub does not have.
(2) To roll back, revert the bad commit on main and push (git revert <hash>), so GitHub
    and the live site stay in sync.
(3) Vercel's free Hobby plan is for personal, non-commercial use, so a real business
    launch needs the Pro plan.
```

---

## Tips for beginners

- **Go one prompt at a time.** Check the result in the browser before moving on.
- **If something breaks,** paste the error message back into Claude Code and ask it to fix it.
- **Never share secrets.** Keep tokens, passwords and `.env` values out of the chat and out of Git.
- **Change the shop's name, products and colours** to make DemoKart your own.
