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