import React from 'react';
import "./LandingPage.css"
import { ReactComponent as FinanceIcon } from "./drawkit/PNG/finance.svg";
export default function LandingPage() {
    return <div className="page-container">
        <div className="main-background">
            <header className="header">
                <span className="logo">ArtLedger</span>
                <nav>
                    <ul>
                        <li><a href="trade">Markets</a></li>
                        <li><a href="#">Learn</a></li>
                        <li><a href="#">Pricing</a></li>
                        <li><a href="#">Support</a></li>
                    </ul>
                </nav>
            </header>
            <main className="main-body">
                <div className="content-box">
                    <h2>Trade the Internet's Most Innovative AI Art</h2>
                    <p>Discover, buy, and sell unique AI-generated artwork. It's creative, exciting, and rewarding.</p>
                    <button>Get Started</button>
                </div>
                <div className="finance-icon-background"><FinanceIcon /></div>
            </main>
        </div>

        <section className="main-body">
            <div className="content-box">
                <h2>Why Choose Us?</h2>
                <p>We provide top-notch features that cater to your financial goals and needs.</p>
                <button>Learn More</button>
            </div>
        </section>

        <footer className="footer">
            <p>&copy; 2025 My Finance App. All rights reserved.</p>
        </footer>
    </div>
}