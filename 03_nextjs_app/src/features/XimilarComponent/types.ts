export interface XimilarRecordRequest {
  _url?: string;
  _base64?: string;
  binary_mask?: boolean;
  white_background?: boolean;
}

export interface XimilarRequest {
  records: XimilarRecordRequest[];
}

export interface XimilarStatus {
  code: number;
  text: string;
  request_id: string;
  proc_id?: string;
}

export interface XimilarRecordResponse {
  binary_mask: boolean;
  white_background: boolean;
  _status: XimilarStatus;
  _id: string;
  _width: number;
  _height: number;
  _output_url: string;
}

export interface XimilarResponse {
  records: XimilarRecordResponse[];
  statistics: {
    time_stats: Record<string, number>;
    'processing time': number;
  };
  status: XimilarStatus;
}
