import { useEffect, useState } from 'react';

const symbols = ['✦', '♫', '☘', '❖'];

function shuffle(cards) {
    const next = [...cards];
    for (let i = next.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
    }
    return next;
}

export default function MemoryGame() {
    const [deck, setDeck] = useState(() => shuffle([...symbols, ...symbols]));
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [locked, setLocked] = useState(false);
    const [status, setStatus] = useState('Find all 4 pairs.');
    const [won, setWon] = useState(false);

    useEffect(() => {
        if (flipped.length < 2) return undefined;
        const [first, second] = flipped;
        setMoves((v) => v + 1);
        if (deck[first] === deck[second]) {
            const nextMatched = [...matched, deck[first]];
            setMatched(nextMatched);
            setFlipped([]);
            if (nextMatched.length === symbols.length) {
                setStatus('You found all the pairs. Here is your reward.');
                setWon(true);
            } else {
                setStatus(`Nice match! ${symbols.length - nextMatched.length} pairs left.`);
            }
            return undefined;
        }
        setLocked(true);
        setStatus('Not a match — take another look.');
        const timer = window.setTimeout(() => {
            setFlipped([]);
            setLocked(false);
            setStatus('Find the next pair.');
        }, 750);
        return () => window.clearTimeout(timer);
    }, [flipped]);

    const restart = () => {
        setDeck(shuffle([...symbols, ...symbols]));
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setLocked(false);
        setWon(false);
        setStatus('Find all 4 pairs.');
    };

    const flip = (index) => {
        if (locked || flipped.includes(index) || matched.includes(deck[index]) || flipped.length === 2) return;
        setFlipped((c) => [...c, index]);
    };

    return (
        <section id="rhythm" className="section-wrap section-block rhythm-section">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">TAKE A QUICK BREAK</p>
                    <h2>Memory match.</h2>
                </div>
                <p className="section-intro">Find all four matching pairs. Take your time — match every pair to reveal your reward.</p>
            </div>
            <div className="rhythm-game glass-card">
                <div className="rhythm-console">
                    <p className="rhythm-instructions">Flip two cards at a time and remember what you see. There’s no timer.</p>
                    <div className="rhythm-board" role="group" aria-label="Memory match cards">
                        {deck.map((symbol, index) => {
                            const isMatched = matched.includes(symbol);
                            const isFlipped = flipped.includes(index) || isMatched;
                            return (
                                <button
                                    key={`${symbol}-${index}`}
                                    className={`memory-card${isFlipped ? ' is-flipped' : ''}${isMatched ? ' is-matched' : ''}`}
                                    type="button"
                                    aria-pressed={isFlipped}
                                    disabled={isMatched}
                                    onClick={() => flip(index)}
                                >
                                    <span className="memory-card-back" aria-hidden="true">?</span>
                                    <span className="memory-card-face" aria-hidden="true">{symbol}</span>
                                </button>
                            );
                        })}
                    </div>
                    <div className="rhythm-footer">
                        <button className="button button-small" type="button" onClick={restart}>Shuffle cards</button>
                        <span className="rhythm-status" role="status" aria-live="polite">
                            {won ? `You found all the pairs in ${moves} moves! Here's your reward.` : status}
                        </span>
                        <span className="rhythm-score">Moves <strong>{moves}</strong></span>
                    </div>
                </div>
                {won && (
                    <div className="rhythm-reveal">
                        <img src="/images/pogi.jpg" alt="Mark Denzel" />
                        <p className="portrait-caption">You beat the game — that's me!</p>
                    </div>
                )}
            </div>
        </section>
    );
}
