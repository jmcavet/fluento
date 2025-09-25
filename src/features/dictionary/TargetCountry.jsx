import AdsClickIcon from "@mui/icons-material/AdsClick";
import Flag from "react-flagkit";

export default function TargetCountry() {
  return (
    <div className="flex items-center justify-center gap-2">
      <AdsClickIcon fontSize="large" />
      <Flag country="FR" size={24} />
    </div>
  );
}
