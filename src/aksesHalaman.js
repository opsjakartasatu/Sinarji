export const PAGES = {
    DASHBOARD: "/internal-test/dashboard",
    MONITORING: "/internal-test/monitoring",
    ANNOUNCEMENT: "/internal-test/announcement",
    KELOLA_AKUN: "/internal-test/kelola-akun",
    HELP_CENTER: "/internal-test/help-center",
    PAKAI_PUBLIC: "/internal-test/pakai-public",
    BERBAGI: "/internal-test/berbagi",
    PAKAI: "/internal-test/pakai",
    CATATAN_RAPAT: "/internal-test/catatan-rapat",
    MAP_SERVICE: "/internal-test/map-service",
    RESEARCH: "/internal-test/research",
    BANNERS: "/internal-test/banners",
    KRITIK_SARAN: "/internal-test/kritik-saran",

    KATALOG_PETA: "/internal-test/katalog-peta",
    PETA_SAYA: "/internal-test/peta-saya",
    DATA_SAYA: "/internal-test/data-saya",
    SURVEY: "/internal-test/survey",
    SIMPUL_JARINGAN: "/internal-test/simpul-jaringan",
    PENELITIAN: "/internal-test/penelitian",
    EVENT: "/internal-test/event",
    BERITA: "/internal-test/berita",
    FITUR_TERBARU: "/internal-test/fitur-terbaru",

    // GEE
    GEE: "/gee",

    // EDIT
    EDIT_SIMPUL_JARINGAN: "/internal-test/simpul-jaringan/edit",

    // CREATE
    CREATE_SIMPUL_JARINGAN: "/internal-test/simpul-jaringan/create",
};

export const EXISTING_PAGES = Object.values(PAGES);

export const ADMIN_GROUP_PATHS = {
    1: [
        PAGES.DASHBOARD,
        PAGES.ANNOUNCEMENT,
        // PAGES.KELOLA_AKUN,
        PAGES.GEE
    ],
    2: [
        PAGES.DASHBOARD,
        // PAGES.KELOLA_AKUN,
        PAGES.GEE
    ],
    3: [
        PAGES.HELP_CENTER,
        PAGES.GEE
    ],
    4: [
        PAGES.DASHBOARD,
        PAGES.PAKAI_PUBLIC,
        PAGES.GEE
    ],
    5: [
        PAGES.DASHBOARD,
        // PAGES.KELOLA_AKUN,
        PAGES.BERBAGI,
        PAGES.PAKAI,
        PAGES.GEE
    ],
    6: [
        PAGES.DASHBOARD,
        // PAGES.KELOLA_AKUN,
        PAGES.BERBAGI,
        PAGES.PAKAI,
        PAGES.GEE
    ],
    7: [
        PAGES.DASHBOARD,
        // PAGES.KELOLA_AKUN,
        PAGES.CATATAN_RAPAT,
        PAGES.ANNOUNCEMENT,
        PAGES.BERBAGI,
        PAGES.PAKAI,
        PAGES.GEE
    ],
    8: [
        PAGES.DASHBOARD,
        // PAGES.KELOLA_AKUN,
        PAGES.CATATAN_RAPAT,
        PAGES.MAP_SERVICE,
        PAGES.RESEARCH,
        PAGES.GEE
    ],
    9: [
        PAGES.DASHBOARD,
        PAGES.BERBAGI,
        PAGES.PAKAI,
        PAGES.EDIT_SIMPUL_JARINGAN,
        PAGES.GEE,
        PAGES.SURVEY
    ]
};

export const EDITOR_GROUP_PATHS = {
    5: [
        PAGES.BERBAGI,
        PAGES.DASHBOARD,
        PAGES.PAKAI,
        PAGES.GEE
    ],
    6: [
        PAGES.BERBAGI,
        PAGES.DASHBOARD,
        PAGES.PAKAI,
        PAGES.GEE
    ],
    7: [
        PAGES.DASHBOARD,
        PAGES.CATATAN_RAPAT,
        PAGES.ANNOUNCEMENT,
        PAGES.BANNERS,
        PAGES.KRITIK_SARAN,
        PAGES.GEE
    ],
    8: [
        PAGES.DASHBOARD,
        PAGES.CATATAN_RAPAT,
        PAGES.MAP_SERVICE,
        PAGES.RESEARCH,
        PAGES.GEE
    ],
    9: [
        PAGES.DASHBOARD,
        PAGES.BERBAGI,
        PAGES.PAKAI,
        PAGES.GEE
    ]
};

export const USER_GROUP_PATHS = {
    3: [
        PAGES.HELP_CENTER,
        PAGES.GEE
    ],
    4: [
        PAGES.DASHBOARD,
        PAGES.PAKAI_PUBLIC,
        PAGES.GEE
    ]
};

export const REDIRECT_RULES = {
    // Group yang ketika mengakses simpul jaringan akan diredirect ke edit
    SIMPUL_TO_EDIT: [9]
};