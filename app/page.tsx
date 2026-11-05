import Portfolio from "@/components/Portfolio";
import { getVariant } from "@/lib/variant";

export default function Page() {
  const v = getVariant();
  return <Portfolio v={v} />;
}
