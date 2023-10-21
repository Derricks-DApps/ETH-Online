import Link from "next/link";
import { useRouter } from "next/router";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Link
      href={href}
      passHref
      style={{
        backgroundColor: "cadetblue",
        color: "white",
        width: "30%",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
        fontSize: "1.5em",
      }}
      onClick={handleClick as any}
      className={`${
        isActive ? "bg-secondary shadow-md" : ""
      } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
