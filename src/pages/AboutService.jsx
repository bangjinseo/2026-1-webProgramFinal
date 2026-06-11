import { useMemo } from 'react';
import { analyzeTextLayout } from '../lib/pretextLayout.js';

const ABOUT_TEXT_FONT = '400 16px -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial';
const ABOUT_TEXT_LINE_HEIGHT = 25;
const ABOUT_TEXT_WIDTH = 640;

function splitSentences(text) {
    return text.match(/[^.!?。！？\n]+[.!?。！？]?|\n+/g) ?? [text];
}

function HighlightText({ children }) {
    const sentences = useMemo(() => splitSentences(children), [children]);
    const sentenceMetrics = useMemo(
        () =>
            sentences.map((sentence) =>
                analyzeTextLayout({
                    text: sentence,
                    locale: 'ko-KR',
                    font: ABOUT_TEXT_FONT,
                    lineHeight: ABOUT_TEXT_LINE_HEIGHT,
                    width: ABOUT_TEXT_WIDTH,
                    maxHeight: 999,
                    maxLines: 12,
                    wordBreak: 'keep-all',
                }),
            ),
        [sentences],
    );

    return (
        <>
            {sentences.map((sentence, index) => (
                <span
                    className="highlight-sentence"
                    data-pretext-lines={sentenceMetrics[index]?.lineCount ?? 1}
                    data-pretext-height={sentenceMetrics[index]?.textHeight ?? 0}
                    key={`${sentence}-${index}`}
                >
                    {sentence}
                </span>
            ))}
        </>
    );
}

const workflowSteps = [
    {
        title: 'Enter Text',
        body: '사용자가 검증할 문장을 입력합니다.',
    },
    {
        title: 'Select Component',
        body: 'Button, Card, Modal, Navigation 중 UI 컴포넌트를 선택합니다.',
    },
    {
        title: 'Choose Language',
        body: 'English, Korean, Japanese, German, French 중 언어를 선택합니다.',
    },
    {
        title: 'Pretext Analysis',
        body: 'Pretext가 줄 수, 텍스트 높이, 레이아웃 정보를 계산합니다.',
    },
    {
        title: 'View Validation Result',
        body: 'Safe, Wrap, Overflow Risk 결과를 확인합니다.',
    },
];

export default function AboutService() {
  return (
    <article className="page-stack about-page">
        <section className="content-hero">
            <p className="eyebrow">Localization Lab</p>
            <h1>인터페이스가 깨지기 전에 텍스트를 검증하세요.</h1>
            <p>
                <HighlightText>
                    번역된 문장이 Human Interface 기반 컴포넌트 안에서 어떻게 동작하는지 미리 확인할 수 있는 경량 로컬라이제이션 검증 서비스입니다.
                </HighlightText>
            </p>
        </section>

        <section className="notes-section">
            <h2>왜 Localization이 중요할까?</h2>
            <p>
                <HighlightText>
                    텍스트는 언어에 따라 길이가 달라지고 줄바꿈 방식도 달라집니다. 영어에서는 자연스럽게 보이는 문장이 독일어에서는 지나치게 길어질 수 있고, 일본어에서는 더 짧게 표현될 수 있습니다. 이러한 차이는 버튼, 카드, 모달, 네비게이션 메뉴의 레이아웃을 무너뜨릴 수 있습니다. 이 서비스는 콘텐츠를 우선으로 고려하면서도 가독성과 접근성을 유지할 수 있는지 미리 검증할 수 있도록 도와줍니다.
                </HighlightText>
            </p>
        </section>

        <section className="principle-grid">
            <div className="principle-item">
                <h3>Localization</h3>
                <p><HighlightText>언어별 길이 차이와 줄바꿈 문제를 미리 확인합니다.</HighlightText></p>
            </div>

            <div className="principle-item">
                <h3>Accessibility</h3>
                <p><HighlightText>모든 사용자가 쉽게 읽고 이해할 수 있는 인터페이스를 지향합니다.</HighlightText></p>
            </div>

            <div className="principle-item">
                <h3>Readability</h3>
                <p><HighlightText>텍스트가 UI 안에서 자연스럽게 읽히는지 검증합니다.</HighlightText></p>
            </div>

            <div className="principle-item">
                <h3>Content First</h3>
                <p><HighlightText>인터페이스보다 콘텐츠 전달을 우선으로 생각합니다.</HighlightText></p>
            </div>
        </section>

        <section className="how-it-works-section">
            <div className="section-heading">
                <h2>How It Works</h2>
                <p><HighlightText>Localization Lab이 텍스트 레이아웃을 검증하는 과정을 단계별로 보여줍니다.</HighlightText></p>
            </div>

            <div className="workflow-list">
                {workflowSteps.map((step, index) => (
                    <div className="workflow-item" key={step.title}>
                        <span className="workflow-number">{index + 1}</span>
                        <div>
                            <h3>{step.title}</h3>
                            <p><HighlightText>{step.body}</HighlightText></p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </article>
  );
}
