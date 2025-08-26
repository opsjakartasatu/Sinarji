import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  ADMIN_GROUP_PATHS,
  EDITOR_GROUP_PATHS,
  USER_GROUP_PATHS,
  EXISTING_PAGES
} from "./aksesHalaman";

const basePath = process.env.BASE_PATH;
const secret = process.env.NEXTAUTH_SECRET;

function getAllowedPaths(userGroupIds, pathMapping) {
  const allowedPaths = new Set();

  userGroupIds.forEach(groupId => {
    const paths = pathMapping[groupId];
    if (paths) {
      paths.forEach(path => allowedPaths.add(path));
    }
  });

  return Array.from(allowedPaths);
}

function hasRole(token, roleName) {
  return token.roles?.some(role => role.name === roleName) || false;
}

// function checkPathAccess(path, allowedPaths) {
//   return allowedPaths.some(allowedPath => path.startsWith(allowedPath));
// }

// function checkPathAccess(path, allowedPaths) {
//   return allowedPaths.includes(path);
// }

// function isPageExists(path) {
//   return EXISTING_PAGES.some(existingPath => path.startsWith(existingPath));
// }

function checkPathAccess(path, allowedPaths) {
  // Cek exact match terlebih dahulu
  if (allowedPaths.includes(path)) {
    return true;
  }

  // Untuk path yang memiliki sub-path, pastikan ada trailing slash atau merupakan sub-path yang valid
  return allowedPaths.some(allowedPath => {
    if (path === allowedPath) return true;
    // Hanya izinkan sub-path jika memang dimaksudkan sebagai parent path
    return path.startsWith(allowedPath + '/') &&
      !EXISTING_PAGES.some(existingPath =>
        existingPath !== allowedPath &&
        existingPath.startsWith(allowedPath + '/') &&
        path.startsWith(existingPath)
      );
  });
}

function shouldRedirectSimpulToEdit(userGroupIds, path) {
  // Cek apakah user mencoba mengakses halaman simpul jaringan
  if (path === PAGES.SIMPUL_JARINGAN) {
    // Cek apakah user termasuk dalam group yang harus diredirect
    return userGroupIds.some(groupId =>
      REDIRECT_RULES.SIMPUL_TO_EDIT.includes(groupId)
    );
  }
  return false;
}

function isPageExists(path) {
  return (
    EXISTING_PAGES.includes(path) ||
    path.startsWith("/internal-test/survey/")
  );
}

export default async function middleware(req) {
  const token = await getToken({ req, secret });
  const path = req.nextUrl.pathname;

  if (path === "/internal-test" || path === "/internal-test/") {
    return NextResponse.redirect(
      new URL(`${basePath}/internal-test/dashboard`, req.url)
    );
  }

  if (!token) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
    return NextResponse.redirect(
      new URL(`${basePath}/login?callbackUrl=${callbackUrl}`, req.url)
    );
  }

  if (!isPageExists(path)) {
    // return NextResponse.rewrite(new URL('/not-found-internal', req.url));
    // return NextResponse.redirect(new URL(`${basePath}/not-found-internal`, req.url));

    const url = new URL(`${basePath}/not-found-internal`, req.url);
    return NextResponse.rewrite(url);
  }

  if (hasRole(token, "SUPER_ADMIN") && path.startsWith("/internal-test")) {
    return NextResponse.next();
  }

  const userGroupIds = token.groups?.map(group => group.id) || [];

  if (hasRole(token, "ADMIN")) {
    const allowedPaths = getAllowedPaths(userGroupIds, ADMIN_GROUP_PATHS);

    if (!checkPathAccess(path, allowedPaths)) {
      // return NextResponse.redirect(new URL(`${basePath}/unauthorized`, req.url));

      const url = new URL(`${basePath}/unauthorized`, req.url);
      return NextResponse.rewrite(url);
    }
  }
  else if (hasRole(token, "EDITOR")) {
    const allowedPaths = getAllowedPaths(userGroupIds, EDITOR_GROUP_PATHS);

    if (!checkPathAccess(path, allowedPaths)) {
      // return NextResponse.redirect(new URL(`${basePath}/unauthorized`, req.url));

      const url = new URL(`${basePath}/unauthorized`, req.url);
      return NextResponse.rewrite(url);
    }
  }
  else if (hasRole(token, "USER")) {
    const allowedPaths = getAllowedPaths(userGroupIds, USER_GROUP_PATHS);

    if (!checkPathAccess(path, allowedPaths)) {
      // return NextResponse.redirect(new URL(`${basePath}/unauthorized`, req.url));

      const url = new URL(`${basePath}/unauthorized`, req.url);
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/gee", "/internal-test/:path*"],
};