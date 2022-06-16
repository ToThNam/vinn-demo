export interface Iusers {
  id?: string;
  userName?: string;
  email?: string;
  password?: string;
  profile?: Iprofile;
  lastLogin?: string;
  country?: string;
  status?: string;
  phone?: string;
  city?: string;
  address?: string;
}

export interface Iprofile {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  avatar?: string;
}
