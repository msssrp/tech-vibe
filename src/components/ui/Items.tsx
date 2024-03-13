import Link from "next/link";

export const navItem = (
  <>
    <div>
      <a>Popular articles</a>
    </div>
    <div>
      <a>NPRU articles</a>
    </div>
    <div>
      <a>New articles</a>
    </div>
    <div>
      <a>Popular Tags</a>
    </div>
    <div>
      <a>All ARTICLES</a>
    </div>
  </>
);

export const profileItems = (
  <div className="text-[#898889] mt-2 flex flex-col space-y-4">
    <Link href={""} className="flex mt-3 space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#CECBCA"
        className="w-5 h-5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
      <span>Profile</span>
    </Link>
    <Link href={""} className="flex space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#CECBCA"
        className="w-5 h-5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
        />
      </svg>
      <span>Articles</span>
    </Link>
    <Link href={""} className="flex space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#CECBCA"
        className="w-5 h-5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
        />
      </svg>
      <span>Library</span>
    </Link>
    <Link href={""} className="flex mb-3 space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#CECBCA"
        className="w-5 h-5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
        />
      </svg>
      <span>Statistics</span>
    </Link>
  </div>
);

export type articleTestLists = {
  article: {
    id: number;
    title: string;
    description: string;
    image: string;
    author: string;
  };
};

export const articleslist = [
  {
    id: 1,
    title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
    description:
      "Lorem ipsum dolor sit amet consectetur. Consequat placerat vestibulum tempor amet tincidunt. Libero venenatis et at consequat quis nunc dignissim justo. Cras mollis volutpat amet odio sit...",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Matheus Ferrero",
  },
  {
    id: 2,
    title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
    description:
      "Lorem ipsum dolor sit amet consectetur. Consequat placerat vestibulum tempor amet tincidunt. Libero venenatis et at consequat quis nunc dignissim justo. Cras mollis volutpat amet odio sit...",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Matheus Ferrero",
  },
  {
    id: 3,
    title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
    description:
      "Lorem ipsum dolor sit amet consectetur. Consequat placerat vestibulum tempor amet tincidunt. Libero venenatis et at consequat quis nunc dignissim justo. Cras mollis volutpat amet odio sit...",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Raj Rana",
  },
  {
    id: 4,
    title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
    description:
      "Lorem ipsum dolor sit amet consectetur. Consequat placerat vestibulum tempor amet tincidunt. Libero venenatis et at consequat quis nunc dignissim justo. Cras mollis volutpat amet odio sit...",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Jonas Kakaroto",
  },
  {
    id: 5,
    title: "maintain security",
    description:
      "Lorem ipsum dolor sit amet consectetur. Consequat placerat vestibulum tempor amet tincidunt. Libero venenatis et at consequat quis nunc dignissim justo. Cras mollis volutpat amet odio sit...",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Jonas Kakaroto",
  },
  {
    id: 6,
    title: "maintain security",
    description:
      "Lorem ipsum dolor sit amet consectetur. Consequat placerat vestibulum tempor amet tincidunt. Libero venenatis et at consequat quis nunc dignissim justo. Cras mollis volutpat amet odio sit...",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Raj Rana",
  },
];
export const tag = [
  { tag_id: 1, tag_name: "database" },
  { tag_id: 2, tag_name: "UX/UI" },
  { tag_id: 3, tag_name: "Development" },
  { tag_id: 4, tag_name: "Tester" },
  { tag_id: 5, tag_name: "Github" },
  { tag_id: 6, tag_name: "tailwind" },
  { tag_id: 7, tag_name: "python" },
  { tag_id: 8, tag_name: "Express" },
];
