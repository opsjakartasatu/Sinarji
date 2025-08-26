import React from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    ADMIN_GROUP_PATHS,
    EDITOR_GROUP_PATHS,
    USER_GROUP_PATHS,
    PAGES,
    REDIRECT_RULES
} from "../../../aksesHalaman";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled
} from "@mui/material";
import Menuitems from "./MenuItems";
import Link from "next/link";

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

function hasRole(roles, roleName) {
    return roles?.some(role => role.name === roleName) || false;
}

function getMenuHref(originalHref, userGroupIds) {
    if (originalHref === PAGES.SIMPUL_JARINGAN) {
        const shouldRedirectToEdit = userGroupIds.some(groupId =>
            REDIRECT_RULES.SIMPUL_TO_EDIT.includes(groupId)
        );

        if (shouldRedirectToEdit) {
            return PAGES.EDIT_SIMPUL_JARINGAN;
        }
    }

    return originalHref;
}

function isMenuSelected(pathname, menuHref, originalHref, userGroupIds) {
    // Jika ini adalah menu Simpul Jaringan yang di-redirect ke edit
    if (originalHref === PAGES.SIMPUL_JARINGAN && menuHref === PAGES.EDIT_SIMPUL_JARINGAN) {
        // Menu Simpul Jaringan akan terlihat selected jika user berada di halaman edit
        return pathname === PAGES.EDIT_SIMPUL_JARINGAN ||
            pathname.startsWith(PAGES.EDIT_SIMPUL_JARINGAN + "/");
    }

    // Logic normal untuk menu lainnya
    return pathname === menuHref || pathname.startsWith(menuHref + "/");
}

const SidebarItems = ({ toggleMobileSidebar, item, level, onClick }) => {
    const pathname = usePathname();
    const pathDirect = pathname;
    const { data: session } = useSession();

    const roles = session?.user?.roles || [];
    const userGroups = session?.user?.groups || [];
    const userGroupIds = userGroups.map(group => group.id);

    const getAllowedPathsForUser = () => {
        if (hasRole(roles, "SUPER_ADMIN")) {
            return Menuitems.map((item) => item.href);
        }

        let allowedPaths = [];

        if (hasRole(roles, "ADMIN")) {
            allowedPaths = getAllowedPaths(userGroupIds, ADMIN_GROUP_PATHS);
        }
        else if (hasRole(roles, "EDITOR")) {
            allowedPaths = getAllowedPaths(userGroupIds, EDITOR_GROUP_PATHS);
        }
        else if (hasRole(roles, "USER")) {
            allowedPaths = getAllowedPaths(userGroupIds, USER_GROUP_PATHS);
        }

        return allowedPaths;
    };

    const allowedPaths = getAllowedPathsForUser();

    const filteredMenuItems = Menuitems.filter((item) => {
        // Untuk SUPER_ADMIN, tampilkan semua menu
        if (hasRole(roles, "SUPER_ADMIN")) {
            return true;
        }

        // Untuk user lain, cek berdasarkan allowedPaths
        // Jika menu adalah Simpul Jaringan dan user group 2 hanya punya akses edit, 
        // tetap tampilkan menu tapi href akan di-redirect
        if (item.href === PAGES.SIMPUL_JARINGAN) {
            // Tampilkan menu Simpul Jaringan jika user punya akses ke simpul jaringan atau edit simpul jaringan
            return allowedPaths.includes(PAGES.SIMPUL_JARINGAN) ||
                allowedPaths.includes(PAGES.EDIT_SIMPUL_JARINGAN);
        }

        return allowedPaths.includes(item.href);
    });

    const ListItemStyled = styled(ListItem)(() => ({
        padding: 0,
        ".MuiButtonBase-root": {
            whiteSpace: "nowrap",
            marginBottom: "2px",
            padding: "8px 10px",
            borderRadius: "8px",
            backgroundColor: level > 1 ? "transparent !important" : "inherit",
            color: "white",
            paddingLeft: "10px",
            "&:hover": {
                backgroundColor: "rgba(0, 53, 119, 0.08)",
                color: "black",
            },
            "&.Mui-selected": {
                color: "black",
                backgroundColor: "rgba(0, 53, 119, 0.08)",
                "&:hover": {
                    backgroundColor: "rgba(0, 53, 119, 0.08)",
                    color: "black",
                },
            },
        },
    }));

    return (
        <List component="div">
            {filteredMenuItems.map((item) => {
                // Tentukan href yang tepat berdasarkan group user
                const actualHref = getMenuHref(item.href, userGroupIds);

                // Tentukan apakah menu ini harus selected
                const isSelected = isMenuSelected(pathDirect, actualHref, item.href, userGroupIds);

                return (
                    <List component="div" disablePadding key={item.id} sx={{ padding: "5px 0" }}>
                        <ListItemStyled>
                            <ListItemButton
                                component={Link}
                                href={actualHref}
                                disabled={item.disabled}
                                selected={isSelected}
                                target={item.external ? "_blank" : ""}
                                onClick={onClick}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: "40px",
                                        p: "3px 0",
                                        color: "inherit",
                                    }}
                                >
                                    {item.icon ? <item.icon sx={{ fontSize: "28px", color: "var(--jakartasatu-biru)" }} /> : null}
                                </ListItemIcon>
                                <ListItemText disableTypography sx={{
                                    color: "var(--jakartasatu-biru)",
                                    fontSize: "18px",
                                    fontWeight: "500",
                                }}>
                                    {item.title}
                                </ListItemText>
                            </ListItemButton>
                        </ListItemStyled>
                    </List>
                );
            })}
        </List>
    );
};

export default SidebarItems;