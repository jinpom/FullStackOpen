import { useState } from 'react';

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = (props) => {
  if (props.feedbackCount === 0) {
    return <div>No given feedback</div>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.feedbackCount} />
        <StatisticLine text="average" value={props.average} />
        <StatisticLine text="positive" value={props.positive + ' %'} />
      </tbody>
    </table>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [totalScore, SetTotalScore] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    const newFeedBackCount = feedbackCount + 1;
    const newTotalScore = totalScore + 1;
    setFeedbackCount(newFeedBackCount);
    SetTotalScore(newTotalScore);
    setAverage(newTotalScore / newFeedBackCount);
    setPositive(((good + 1) / newFeedBackCount) * 100);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    const newFeedBackCount = feedbackCount + 1;
    // No need to compute for new  total scoere
    // since neutral feedback has 0 point
    setFeedbackCount(newFeedBackCount);
    setAverage(totalScore / newFeedBackCount);
    setPositive((good / newFeedBackCount) * 100);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
    const newFeedBackCount = feedbackCount + 1;
    const newTotalScore = totalScore - 1;
    setFeedbackCount(newFeedBackCount);
    SetTotalScore(newTotalScore);
    setAverage(newTotalScore / newFeedBackCount);
    setPositive((good / newFeedBackCount) * 100);
  };

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />

      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        feedbackCount={feedbackCount}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
