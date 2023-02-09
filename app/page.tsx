import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Remove the styles['modified-button'] and you'll get the default ui */}
      <Button className={styles["modified-button"]}>Button</Button>
    </main>
  );
}

// Extending the react button element, we can reduce the amount of props that would be defined on the component
// so -- attributes like "type" and "disabled" are already defined on the button element, and can be passed as-is
interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button {...rest} className={`${styles.button} ${rest.className}`}>
      {children}
    </button>
  );
};
