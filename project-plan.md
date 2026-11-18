# Final Project Plan

## Milestone 1: Plan

Path: B

### Enhancement: Post Categories

What the user will see: Users will be able to assign a category (such as Technology, Lifestyle, Tutorial, News, or General) when creating or editing a blog post. Each post card on the home page and the full post view will display a category badge. On the home page, users can click category filter buttons (including an "All" option) to view posts belonging to a specific category.
Back-end changes: Add a `category` field to the `Post` Mongoose schema (`String`, required, validated with an `enum` of fixed categories, defaulting to `'General'` for backward compatibility with older posts). Update `POST /api/posts` and `PUT /api/posts/:id` validation rules with `express-validator` to require a valid category. Update `GET /api/posts` to accept an optional `category` query parameter (e.g., `/api/posts?category=Technology`) and filter the MongoDB query when provided.
Front-end changes: Update `PostForm.jsx` to include a controlled `<select>` dropdown for choosing a category when creating or editing a post. Update `PostCard.jsx` and `PostDetail.jsx` (along with their CSS files) to render the post's category badge. Update `Home.jsx` and `Home.css` to display category filter controls above the post list and keep the loading indicator inside the post list container so filter buttons remain visible during requests. Update `getPosts` in `client/src/services/api.js` to accept and pass the `category` query parameter.
New packages: none
What I will test:

- A category can be selected when creating a new post and changed when editing an existing post
- The selected category badge displays accurately on both post cards and the post detail page
- Clicking a category filter button on the home page shows only posts in that category, and clicking "All" displays every post
- The server rejects a POST or PUT request that contains an invalid or missing category
- Older posts created before the category field existed still render properly without errors

### Enhancement: Search

What the user will see: A search bar with a clear button will appear on the home page above the post feed, allowing users to search posts by keywords in either the title or body. Results update automatically after the user pauses typing, and a friendly empty-state message appears when no posts match the search query.
Back-end changes: Update `GET /api/posts` in `server.js` to accept an optional `search` query parameter (e.g., `/api/posts?search=react`). Escape special regular expression characters in the search input, then query MongoDB using a case-insensitive `$regex` combined with `$or` across both `title` and `body` fields (working seamlessly alongside the `category` filter if both are active). Return all matching posts when `search` is empty or omitted.
Front-end changes: Create `client/src/components/SearchBar.jsx` and `client/src/components/SearchBar.css` with a controlled search input and a clear (`×` / Clear) button. Integrate `SearchBar` into `Home.jsx` and use a `useEffect` with `setTimeout` (300ms debounce) so API calls only fire after the user stops typing. Display a "No posts found" message inside `Home.jsx` when the returned array is empty. Update `getPosts` in `client/src/services/api.js` to send the `search` query parameter.
New packages: none
What I will test:

- Typing in the search box updates the post list after a short pause without firing a request on every single keystroke
- Search accurately matches keywords in both post titles and post bodies, regardless of uppercase or lowercase letters
- Searching for special regex characters like `*` or `.` does not crash the server, and searching `.` only matches posts containing a period
- Clicking the clear button resets the search input and restores all posts
- When no posts match the search term (or combined search + category filter), a clear "no posts found" message is displayed

### Task List

1. Update the `Post` Mongoose model (`models/Post.js`) to add the `category` field with `enum` validation and default value - Project Week 2
2. Update `server.js` validation on `POST /api/posts` and `PUT /api/posts/:id` to validate `category`, and update `GET /api/posts` to support both `category` and escaped `$regex` `search` query parameters - Project Week 2
3. Test all updated API endpoints with valid, invalid, and special-character queries - Project Week 2
4. Update `client/src/services/api.js` (`getPosts`, `createPost`, `updatePost`) to pass `category` and `search` parameters - Project Week 2
5. Update `PostForm.jsx`, `PostCard.jsx`, and `PostDetail.jsx` (and their CSS files) to support selecting and displaying post categories - Project Week 3
6. Create `SearchBar.jsx` and `SearchBar.css`, and integrate debounced search and category filtering into `Home.jsx` and `Home.css` - Project Week 3
7. Complete Milestone 2 progress update in `project-plan.md` and push to GitHub - Project Week 3
8. Run full end-to-end testing (new features + Activities 1–9 regression tests), fill in Final Test Results in `project-plan.md`, update `README.md`, record the 1–3 minute demo video, and merge `final-project` into `main` - Project Week 4

### Questions or Risks

- **Combining `category` and `search` filters in MongoDB:** I want to make sure that if a user selects a category *and* types a search query at the same time, both conditions apply together (`AND` logic) while `$or` is used across `title` and `body`. I will verify the Mongoose query object structure (`filter.category = ...` alongside `filter.$or = [...]`) when testing `GET /api/posts`.
- **Preventing UI flicker during loading:** Currently `Home.jsx` replaces the entire page content with a loading message while fetching posts, which would unmount the `SearchBar` and lose input focus while typing. I will move the loading indicator inside the post list section so the search bar and category buttons stay mounted.

## AI Usage

Tools: Gemini
What I used them for: Discussed enhancement options (Path A vs. Path B) and structured the Milestone 1 project plan, testing checklists, and task schedule.
How I checked the result: Reviewed every requirement against the Final Project instructions and Milestone 1 rubric to ensure all required sections, fields, file paths, and test cases match my existing codebase structure.