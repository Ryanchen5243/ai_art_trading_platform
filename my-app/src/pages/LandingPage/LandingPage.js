import styles from './LandingPage.module.css';
import { ReactComponent as FinanceIcon } from './drawkit/PNG/finance.svg'; // Adjust import path if needed

export default function LandingPage() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.mainBackground}>
                <header className={styles.header}>
                    <span className={styles.logo}>ArtLedger</span>
                    <nav>
                        <ul className={styles.navList}>
                            <li><a href="trade">Markets</a></li>
                            <li><a href="#">Learn</a></li>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">Support</a></li>
                        </ul>
                    </nav>
                </header>
                <main className={styles.mainBody}>
                    <div className={styles.contentBox}>
                        <h2>Trade the Internet's Most Innovative AI Art</h2>
                        <p>Discover, buy, and sell unique AI-generated artwork. It's creative, exciting, and rewarding.</p>
                        <button className={styles.button}>Get Started</button>
                    </div>
                    <div className={styles.financeIconBackground}><FinanceIcon /></div>
                </main>
            </div>

            <section className={styles.mainBody}>
                <div className={styles.contentBox}>
                    <h2>Why Choose Us?</h2>
                    <p>We provide top-notch features that cater to your financial goals and needs.</p>
                    <button className={styles.button}>Learn More</button>
                </div>
            </section>

            <footer className={styles.footer}>
                <p>&copy; 2025 My Finance App. All rights reserved.</p>
            </footer>
        </div>
    );
}
