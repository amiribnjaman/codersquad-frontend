import { usePathname, useRouter } from "next/navigation";

export const handleLogout = () => {
  const navigate = useRouter();
    const [logoutBtn, setLogoutBtn] = useState(false);
    
    
  localStorage.removeItem("Token");
  setLogoutBtn(!logoutBtn);
  navigate.push("/login");
};
