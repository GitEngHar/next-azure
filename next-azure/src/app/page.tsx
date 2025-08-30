"use client";
import { useEffect, useState } from "react";

type ClientPrincipal = {
  userId: string;
  userDetails: string; // メールアドレス
  identityProvider: string;
  userRoles: string[];
};

export default function HomePage() {
  const [user, setUser] = useState<ClientPrincipal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SWAの /.auth/me で現在のユーザー情報を取得
    fetch("/.auth/me")
        .then((res) => res.json())
        .then((data) => {
          if (data?.clientPrincipal) {
            setUser(data.clientPrincipal);
          }
        })
        .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
        <div>
          <h1>Welcome! Please log in</h1>
          <a href="/.auth/login/aad">Login with Entra ID</a>
        </div>
    );
  }

  return (
      <div>
        <h1>Hello, {user.userDetails}</h1>
        <p>Provider: {user.identityProvider}</p>
        <p>Roles: {user.userRoles.join(", ")}</p>

        <a href="/.auth/logout">Logout</a>
      </div>
  );
}
