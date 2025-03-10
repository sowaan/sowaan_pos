export function IconMenu() {
  return (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      />
    </svg>
  );
}

export function IconSearch() {
  return (
    <svg
      className="w-4 h-4 text-gray-500"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
      />
    </svg>
  );
}

export function IconBag() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M4.85795 8.84661C4.93811 7.80461 5.80699 7 6.85206 7H17.1479C18.193 7 19.0619 7.80461 19.142 8.84661L19.6687 15.6932C19.8474 18.0164 18.0105 20 15.6805 20H8.31951C5.98947 20 4.15259 18.0164 4.33129 15.6932L4.85795 8.84661Z"
        stroke="#000000"
      />
      <path
        d="M15 11V6C15 4.34315 13.6569 3 12 3V3C10.3431 3 9 4.34315 9 6V11"
        stroke="#000000"
      />
    </svg>
  );
}

export function IconEye({ className }) {
  return (
    <svg
      className={className ? className : "fill-current"}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 4.5C6.5 4.5 2.9 7.4 1.3 11C2.9 14.6 6.5 17.5 11 17.5C15.5 17.5 19.1 14.6 20.7 11C19.1 7.4 15.5 4.5 11 4.5ZM11 15.5C8.5 15.5 6.5 13.5 6.5 11C6.5 8.5 8.5 6.5 11 6.5C13.5 6.5 15.5 8.5 15.5 11C15.5 13.5 13.5 15.5 11 15.5ZM11 8C9.5 8 8.3 9.2 8.3 11C8.3 12.8 9.5 14 11 14C12.5 14 13.7 12.8 13.7 11C13.7 9.2 12.5 8 11 8Z"
        fill=""
      />
    </svg>
  );
}

export function IconEyeOff({ className }) {
  return (
    <svg
      className={className ? className : "fill-current"}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke="currentColor"
        d="M11 4.5C6.5 4.5 2.9 7.4 1.3 11C2.9 14.6 6.5 17.5 11 17.5C15.5 17.5 19.1 14.6 20.7 11C19.1 7.4 15.5 4.5 11 4.5ZM11 15.5C8.5 15.5 6.5 13.5 6.5 11C6.5 8.5 8.5 6.5 11 6.5C13.5 6.5 15.5 8.5 15.5 11C15.5 13.5 13.5 15.5 11 15.5ZM11 8C9.5 8 8.3 9.2 8.3 11C8.3 12.8 9.5 14 11 14C12.5 14 13.7 12.8 13.7 11C13.7 9.2 12.5 8 11 8Z"
        fill=""
      />
      <path
        d="M19.2516 3.30005L3.25156 19.3001L4.35156 20.4001L20.3516 4.40005L19.2516 3.30005Z"
        fill=""
      />
    </svg>
  );
}

export function IconAdd({ className }) {
  return (
    <svg
      className={className ? className : "text-gray-700"}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 2V16M2 9H16" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function IconGoBack({ className }) {
  return (
    <svg
      className="fill-current"
      width={20}
      height={18}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
        fill
      />
    </svg>
  );
}
