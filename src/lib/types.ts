export interface Game {
  id: string;
  title: string;
  provider: string;
  category: GameCategory;
  thumbnail: string;
  imageUrl?: string;
  rtp: number;
  isNew?: boolean;
  isHot?: boolean;
  isLive?: boolean;
  minBet: number;
  maxBet: number;
  players?: number;
  rating: number;
  tags: string[];
}

export type GameCategory =
  | "slots"
  | "live-casino"
  | "table-games"
  | "sports"
  | "poker"
  | "jackpot"
  | "crash"
  | "provably-fair";

export interface Sport {
  id: string;
  name: string;
  icon: string;
  eventCount: number;
}

export interface BettingEvent {
  id: string;
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  isLive: boolean;
  odds: {
    home: number;
    draw?: number;
    away: number;
  };
  score?: {
    home: number;
    away: number;
  };
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  type:
    | "welcome"
    | "reload"
    | "cashback"
    | "freespins"
    | "vip"
    | "referral"
    | "tournament";
  bonus: string;
  wagering: number;
  expiry?: string;
  expiresIn?: string;
  isActive: boolean;
  minDeposit?: number;
  maxBonus?: string;
  validGames?: string[];
}

export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "bet" | "win" | "bonus";
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  timestamp: string;
  description: string;
}

export interface VIPLevel {
  level: number;
  name: string;
  minPoints: number;
  maxPoints: number;
  color: string;
  benefits: string[];
  icon: string;
  cashbackRate: number;
}
