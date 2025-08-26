import PieChartOutlineRoundedIcon from '@mui/icons-material/PieChartOutlineRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ConnectWithoutContactRoundedIcon from '@mui/icons-material/ConnectWithoutContactRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
// import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: PieChartOutlineRoundedIcon,
    href: "/internal-test/dashboard",
  },
  {
    id: uniqueId(),
    title: "Monitoring",
    icon: BarChartRoundedIcon,
    href: "/internal-test/monitoring",
  },
  {
    id: uniqueId(),
    title: "Berbagi",
    icon: ShareOutlinedIcon,
    href: "/internal-test/berbagi",
  },
  {
    id: uniqueId(),
    title: "Pakai",
    icon: TaskAltRoundedIcon,
    href: "/internal-test/pakai",
  },
  {
    id: uniqueId(),
    title: "Katalog Peta",
    icon: MapOutlinedIcon,
    href: "/internal-test/katalog-peta",
  },
  {
    id: uniqueId(),
    title: "Peta Saya",
    icon: FmdGoodOutlinedIcon,
    href: "/internal-test/peta-saya",
  },
  {
    id: uniqueId(),
    title: "Data Saya",
    icon: FolderOutlinedIcon,
    href: "/internal-test/data-saya",
  },
  {
    id: uniqueId(),
    title: "Survey",
    icon: AssignmentOutlinedIcon,
    href: "/internal-test/survey",
  },
  {
    id: uniqueId(),
    title: "Simpul Jaringan",
    icon: ConnectWithoutContactRoundedIcon,
    href: "/internal-test/simpul-jaringan",
  },
  {
    id: uniqueId(),
    title: "Penelitian",
    icon: SearchRoundedIcon,
    href: "/internal-test/penelitian",
  },
  {
    id: uniqueId(),
    title: "Event",
    icon: EventAvailableOutlinedIcon,
    href: "/internal-test/event",
  },
  {
    id: uniqueId(),
    title: "Berita",
    icon: NewspaperOutlinedIcon,
    href: "/internal-test/berita",
  },
  {
    id: uniqueId(),
    title: "Catatan Rapat",
    icon: FeedOutlinedIcon,
    href: "/internal-test/catatan-rapat",
  },
  {
    id: uniqueId(),
    title: "Fitur Terbaru",
    icon: NewReleasesOutlinedIcon,
    href: "/internal-test/fitur-terbaru",
  },
  {
    id: uniqueId(),
    title: "Kelola Akun",
    icon: ManageAccountsOutlinedIcon,
    href: "/internal-test/kelola-akun",
  },
  // {
  //   id: uniqueId(),
  //   title: "Test Page",
  //   icon: BugReportOutlinedIcon,
  //   href: "/internal-test/test-page",
  // },
];

export default Menuitems;
