import { type RouteSectionProps } from "@solidjs/router";

export default function Group(props: RouteSectionProps) {
  return (
    <>
      <div>Group Content</div>
      {props.children}
    </>
  );
}
