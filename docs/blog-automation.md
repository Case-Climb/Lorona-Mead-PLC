# Blog automation runbook

Once a month, a Grok scheduled task plans the next month's 12 blog posts and
sends the plan to Claude Code. Claude Code does all the work: it writes the 12
posts in one session, dates them across the month, and pushes them. Each post
stays hidden on the site until its publish date. On each publish date a second
Grok task redeploys the site on Vercel, which adds that day's post to the
sitemap, RSS feed and prerendered search-engine pages.

Grok plans, sends and redeploys; it never writes or edits posts. Edit this file
to change how Claude Code does the work; the Grok prompts don't need to change.

## Grok task 1: monthly plan

- **Schedule:** monthly, on the 20th at 9:00 AM Arizona time (America/Phoenix).
  That leaves time to review the posts before the month starts.
- **Task prompt for Grok:**

```text
You plan the blog calendar for Lorona Mead, PLC, a criminal defense law firm
in Phoenix, Arizona (attorney Jess A. Lorona; website www.loronameadpllc.com).

1. Work out NEXT month (Arizona time). The 12 publish dates are that month's
   1st, 3rd, 6th, 8th, 11th, 13th, 16th, 18th, 21st, 23rd, 26th and 28th.

2. Pick 12 blog topics, one per date, that people in the Phoenix area actually
   search for when they or a family member face a criminal charge. Use what
   you know about current search interest, news and seasonal patterns (for
   example DUI enforcement around holidays and big events). Mix the practice
   areas: dui, drug-charges, assault-domestic-violence, theft-white-collar,
   weapons-charges, expungements, general. Mix the locations: phoenix,
   scottsdale, mesa, tempe, arizona. Make each topic specific and helpful,
   never sensational.

3. Send Claude Code exactly this message, with your plan filled in as the 12
   lines at the bottom, and nothing else:

-----
Plan and publish next month's blog posts for the Lorona Mead, PLC website.
Repository: https://github.com/Case-Climb/Lorona-Mead-PLC (branch main).
Open the repository (clone it if needed), update to the latest main, then
follow the "Monthly run" steps in docs/blog-automation.md exactly, using this plan.

Plan (publish date | working title | primary keyword | category | location | notes):
YYYY-MM-DD | ... | ... | ... | ... | ...
(12 lines)
-----

4. Do not write any blog posts yourself. When Claude Code replies, show me its
   final reply.

5. Then check Vercel: the newest production deployment of the project for
   www.loronameadpllc.com (branch main) must have finished with status
   Ready. If it failed, show me the error from its build log.
```

## Grok task 2: publish-day redeploy

- **Schedule:** daily at 6:00 AM Arizona time (America/Phoenix).
- **Task prompt for Grok:**

```text
Check today's date in Arizona time (America/Phoenix). If the day of the month
is NOT one of 1, 3, 6, 8, 11, 13, 16, 18, 21, 23, 26, 28, do nothing and reply
"No post today".

Otherwise, in Vercel, redeploy the current production deployment of the
project for www.loronameadpllc.com (branch main, production environment).
Do not change any settings, environment variables or domains, and do not
deploy any other branch.

Wait until the deployment is Ready. Then open
https://www.loronameadpllc.com/sitemap.xml and find the URL under /blog/
whose <lastmod> is today's date. Open that URL and check the page loads
with an article title. Reply with the post title and URL. If the deployment
fails, or no post is dated today, tell me what you found.
```


## Monthly run (for Claude Code)

Do these steps in order. If a step fails, stop, push nothing, and reply with
what failed and the error output.

1. **Get the latest code.** Work in a checkout of `Case-Climb/Lorona-Mead-PLC`.
   Run `git fetch origin main`, switch to `main` and fast-forward it to
   `origin/main`. If the checkout has uncommitted changes, stop and report
   them instead of discarding anything.
2. **Install.** `pnpm install --frozen-lockfile`
3. **Load the plan into the topic queue** (`client/src/content/blog-topics.json`).
   For each line of the plan:
   - Skip it if a post in `client/src/content/blog/` already has that date, or
     already covers the same subject. Note every skip for your reply.
   - If an unused topic already in the queue covers the same subject, reuse it
     (it keeps its pre-made image): set its `publishDate` to the planned date.
   - Otherwise add a new topic: `id` (short kebab-case), `workingTitle`,
     `primaryKeyword`, `category` (one of `dui`, `drug-charges`,
     `assault-domestic-violence`, `theft-white-collar`, `weapons-charges`,
     `expungements`, `general`), `location` (one of `phoenix`, `scottsdale`,
     `mesa`, `tempe`, `arizona`), `notes`, and `publishDate`.
   - **Image for a new topic:** if you have Higgsfield image tools, generate
     one with model `gpt_image_2_5`, aspect ratio 16:9, quality `medium`,
     resolution `2k`, and this prompt: "Cinematic editorial photograph for a
     criminal defense law firm blog article about <subject>. <one sentence
     describing a calm, symbolic scene: objects, places or light, no people's
     faces>. Dark, moody palette of deep charcoal and black with warm gold
     highlights, shallow depth of field, premium, serious and calm tone, not
     sensational. No text, no words, no logos, no license plates, no
     recognizable faces." Download it, resize to 1600px wide, save as a
     quality-82 JPEG at `client/public/blog-images/<id>.jpg`, and set the
     topic's `image` (`/blog-images/<id>.jpg`) and `imageAlt`. Without
     Higgsfield, leave `image` unset; the post then uses the practice area's
     stock photo.
   - Move all planned topics to the front of the queue, in date order.
4. **Write the posts.** `pnpm blog:generate --count 12 --scheduled`
   (use the number of planned topics if fewer than 12 remain). It writes only
   topics with a `publishDate`, dates each post accordingly, checks each draft,
   and saves `client/src/content/blog/<slug>.md`.
   - If it fails only because the `claude` command inside it can't run or sign
     in, write the posts yourself: `pnpm blog:generate --dry-run` prints the
     writing rules and allowed links. Follow them exactly, save each file in
     the same format as the newest existing post, with `date` set to the
     topic's `publishDate` and `topicId`, `image`, `imageAlt` from the topic.
     Check each by hand: 1,200–1,700 words, at least 4 `##` headings, no `#`
     heading, no raw HTML, 3–5 links using only the allowed URLs, 3–5 FAQs.
5. **Confirm the result.** Every planned topic has exactly one post with its
   planned date, and no post was written with today's date unless planned.
6. **Review each post like an editor.** Read every new post in full. Fix
   anything wrong or risky: statements about Arizona law you're not confident
   are accurate (soften or remove them), invented statistics, cases or
   statutes, promised or implied outcomes, the words "expert", "specialist" or
   "best" about the firm, and broken or off-site links. Keep edits minimal.
7. **Verify the site.** `pnpm check`, then `pnpm build:static` (it fails if any page can't be rendered). Both must pass.
8. **Publish.** Commit the new posts, the topic queue and any new images with
   the message `Blog: schedule for <Month YYYY> (<n> posts)` and push to
   `main`. Vercel deploys it; each post goes live on its date. If pushing to
   `main` is refused, push to a new branch `blog/<yyyy-mm>` and open a pull
   request into `main` instead.
9. **Reply** with a table of date, title and
   `https://www.loronameadpllc.com/blog/<slug>`; any skipped plan lines and
   why; any edits made in step 6; and the commit hash (or pull request link).

## Maintenance

- **Rebuild backup:** Grok task 2 does the publish-day rebuild. If you'd rather
  not rely on Grok for it, add the `VERCEL_DEPLOY_HOOK` repository secret
  (Vercel → Project Settings → Git → Deploy Hooks → create a hook for `main`)
  and `.github/workflows/daily-rebuild.yml` rebuilds every morning; without the
  secret that workflow does nothing. Even with no rebuild at all, posts still
  appear on their dates; only the sitemap, RSS and search-engine pages lag
  until the next deploy.
- **Manual backup:** GitHub → Actions → "Publish blog post" → Run workflow
  publishes the next queued topic immediately (needs the
  `CLAUDE_CODE_OAUTH_TOKEN` secret).
- **Moving a post:** change the `date` in its Markdown file. A future date
  hides it until then.
