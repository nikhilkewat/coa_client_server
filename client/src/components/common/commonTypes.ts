export type SelectedOption = {
    value: string | number;
    label: string;
    other?: any;
}

export type Callbacks = {
    onSuccess?: (val: any) => void;
    onError?: (val: any) => void;
}

export type Actions = {
    type: string;
    payload: any;
  };
  