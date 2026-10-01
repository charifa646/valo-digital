import {
  IconArrowRight,
  IconArrowUpRight,
  IconBolt,
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandWhatsapp,
  IconBrandYoutubeFilled,
  IconCheck,
  IconCompass,
  IconHeartFilled,
  IconMail,
  IconMapPin,
  IconMenu,
  IconPhone,
  IconPlayerPlayFilled,
  IconRocket,
  IconSchool,
  IconShoppingCart,
  IconSpeakerphone,
  IconTarget,
  IconTrendingUp,
  IconUsers,
  IconX,
  IconZoomScan,
} from "@tabler/icons-react";

/**
 * One icon family for the whole site (Tabler, one stroke width), behind the
 * names the components already use.
 */
type P = { className?: string };
const stroke = 1.8;

export const ArrowRight = ({ className }: P) => <IconArrowRight className={className} stroke={stroke} aria-hidden />;
export const ArrowUpRight = ({ className }: P) => <IconArrowUpRight className={className} stroke={stroke} aria-hidden />;
export const WhatsApp = ({ className }: P) => <IconBrandWhatsapp className={className} stroke={stroke} aria-hidden />;
export const Phone = ({ className }: P) => <IconPhone className={className} stroke={stroke} aria-hidden />;
export const Mail = ({ className }: P) => <IconMail className={className} stroke={stroke} aria-hidden />;
export const Pin = ({ className }: P) => <IconMapPin className={className} stroke={stroke} aria-hidden />;
export const Check = ({ className }: P) => <IconCheck className={className} stroke={2.4} aria-hidden />;
export const Close = ({ className }: P) => <IconX className={className} stroke={2} aria-hidden />;
export const Menu = ({ className }: P) => <IconMenu className={className} stroke={2} aria-hidden />;

/* the four doors */
export const Cap = ({ className }: P) => <IconSchool className={className} stroke={stroke} aria-hidden />;
export const Scan = ({ className }: P) => <IconZoomScan className={className} stroke={stroke} aria-hidden />;
export const Handoff = ({ className }: P) => <IconUsers className={className} stroke={stroke} aria-hidden />;
export const Rocket = ({ className }: P) => <IconRocket className={className} stroke={stroke} aria-hidden />;

/* the four words of the hero */
export const Megaphone = ({ className }: P) => <IconSpeakerphone className={className} stroke={stroke} aria-hidden />;
export const Target = ({ className }: P) => <IconTarget className={className} stroke={stroke} aria-hidden />;
export const Cart = ({ className }: P) => <IconShoppingCart className={className} stroke={stroke} aria-hidden />;

/* the three pillars */
export const Compass = ({ className }: P) => <IconCompass className={className} stroke={stroke} aria-hidden />;
export const Bolt = ({ className }: P) => <IconBolt className={className} stroke={stroke} aria-hidden />;
export const Trend = ({ className }: P) => <IconTrendingUp className={className} stroke={stroke} aria-hidden />;

export const Play = ({ className }: P) => <IconPlayerPlayFilled className={className} aria-hidden />;

/* platforms */
export const Facebook = ({ className }: P) => <IconBrandFacebookFilled className={className} aria-hidden />;
export const Instagram = ({ className }: P) => <IconBrandInstagram className={className} stroke={stroke} aria-hidden />;
export const TikTok = ({ className }: P) => <IconBrandTiktok className={className} stroke={stroke} aria-hidden />;
export const YouTube = ({ className }: P) => <IconBrandYoutubeFilled className={className} aria-hidden />;
export const Heart = ({ className }: P) => <IconHeartFilled className={className} aria-hidden />;
