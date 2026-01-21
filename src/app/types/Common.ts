export interface Invoice {
  customer_name: string;
  document_number: number;
  document_type: string; 
  seller_name: string;
  issue_date: string;
  due_date: string;
  days_expired: number;
  net_amount: number;
  is_active: boolean;
}

export interface Customer {
  customer_id: number;
  customer_code: string;
  customer_name: string;
  credit_days: number;
  region: string;
  seller: string;
  is_active: boolean;
}

export interface AccountsReceivableWithCustomer {
  id: string; 
  customer_name: string;
  customer_code: string;
  document_type: string;
  document_number: string;
  issue_date: string; 
  due_date: string; 
  days_expired: number;
  net_amount: number;
  ar_is_active: boolean;
  created_at: string; 
  credit_days: number;
  region_name: string;
  zone: string;
  sub_zone: string;
  sub_zone_code: string;
  seller_first_name: string;
  seller_last_name: string;
  seller_full_name: string;
}