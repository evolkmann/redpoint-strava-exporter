export enum StravaActivityTypeTextual {
    ROCKCLIMBING = 'rockclimbing'
}

export interface StravaOauthTokenResponse {
    token_type: 'Bearer';
    expires_at: number;
    expires_in: number;
    refresh_token: string;
    access_token: string;
    athlete: StravaAthlete;
}

export interface StravaAthlete {
    id: number;
    username: string;
    resource_state: number;
    firstname: string;
    lastname: string;
    bio: string;
    city: string;
    state: string;
    country: string;
    sex: string;
    premium: boolean;
    summit: boolean;
    created_at: string;
    updated_at: string;
    badge_type_id: number;
    weight: number;
    profile: string;
    profile_medium: string;
    friend: unknown;
    follower: unknown;
}
