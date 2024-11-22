import { Redirect } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Home(): JSX.Element {
  const {
    siteConfig: { baseUrl },
  } = useDocusaurusContext();

  return <Redirect to={`${baseUrl}docs/Training/Welcome`} />;
}
