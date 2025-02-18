// Dummy data representing students
const students = [
  { name: 'Ali', questionsAsked: 10, answersGiven: 2, bonusPoints: 5, downvotes: 2 },
  { name: 'Ahmed', questionsAsked: 2, answersGiven: 20, bonusPoints: 10, downvotes: 4 },
  { name: 'Sara', questionsAsked: 8, answersGiven: 10, bonusPoints: 8, downvotes: 0 },
];

// Total junior questions and unanswered junior questions
const juniorQuestions = {
  totalQuestions: 50,
  unansweredQuestions: 10,
};

// Constants
const POINTS = {
  question: 2, // Points per question asked
  answer: 5, // Points per answer given
  bonus: 1, // Points per bonus
  downvote: -1, // Points per downvote
};

const PENALTY_WEIGHT = juniorQuestions.unansweredQuestions / juniorQuestions.totalQuestions; // Penalty fraction

// Function to calculate total points for each student
function calculateTotalPoints(student) {
  const { questionsAsked, answersGiven, bonusPoints, downvotes } = student;
  return (
    questionsAsked * POINTS.question +
    answersGiven * POINTS.answer +
    bonusPoints * POINTS.bonus +
    downvotes * POINTS.downvote
  );
}

// Function to calculate final percentage before penalty
function calculateFinalPercentage(studentPoints, topPoints) {
  return (studentPoints / topPoints) * 100;
}

// Function to apply penalty to final percentage
function applyPenalty(finalPercentage, penaltyFraction) {
  return finalPercentage * (1 - penaltyFraction);
}

// Function to assign badge based on adjusted percentage
function assignBadge(adjustedPercentage) {
  if (adjustedPercentage >= 90) return 'Legend';
  if (adjustedPercentage >= 75) return 'Mentor';
  if (adjustedPercentage >= 50) return 'Helper';
  return 'Beginner';
}

// Main function to process the data and calculate results
function processStudentData(students, juniorQuestions) {
  const results = [];

  // Calculate total points for all students
  const studentPoints = students.map((student) => calculateTotalPoints(student));

  // Determine the top scorer's points
  const topPoints = Math.max(...studentPoints);

  // Process each student
  students.forEach((student, index) => {
    const totalPoints = studentPoints[index];
    const finalPercentage = calculateFinalPercentage(totalPoints, topPoints);
    const adjustedPercentage = applyPenalty(finalPercentage, PENALTY_WEIGHT);
    const badge = assignBadge(adjustedPercentage);

    results.push({
      name: student.name,
      totalPoints,
      finalPercentage: finalPercentage.toFixed(2),
      adjustedPercentage: adjustedPercentage.toFixed(2),
      badge,
    });
  });

  return results;
}

// Execute the system and display results
const results = processStudentData(students, juniorQuestions);
console.log('Final Results:', results);
