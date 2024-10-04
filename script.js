// Simulated data for challenges with flags
const challenges = {
  html: { flag: "AOC{htmlFlag123}", points: 10 },
  python: { flag: "AOC{pyFlag321}", points: 20 },
  cybersecurity: { flag: "AOC{cyberFlag456}", points: 30 }
};

let leaderboard = [];
let userProgress = {
  name: '',
  totalPoints: 0,
  completedChallenges: []
};

// Function to submit a flag and check if it's correct
function submitFlag(category) {
  const userFlag = document.getElementById(`${category}-flag`).value.trim();
  if (userFlag === challenges[category].flag) {
    alert("Correct flag!");
    userProgress.completedChallenges.push(category);
    userProgress.totalPoints += challenges[category].points;
    updateProgress();
    updateLeaderboard();
    checkForCompletion();
  } else {
    alert("Incorrect flag. Try again!");
  }
}

// Function to update the leaderboard display
function updateLeaderboard() {
  const leaderboardList = document.getElementById('leaderboard-list');
  leaderboardList.innerHTML = '';
  leaderboard.sort((a, b) => b.points - a.points).forEach((user, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${user.name} - ${user.points} points`;
    leaderboardList.appendChild(li);
  });
}

// Function to update user progress
function updateProgress() {
  document.getElementById('progress-user-name').textContent = userProgress.name;
  document.getElementById('total-points').textContent = userProgress.totalPoints;
  const progressList = document.getElementById('progress-list');
  progressList.innerHTML = '';
  userProgress.completedChallenges.forEach(challenge => {
    const li = document.createElement('li');
    li.textContent = `${challenge} Challenges Completed`;
    progressList.appendChild(li);
  });
}

// Function to check if user has completed all challenges and show certificate button
function checkForCompletion() {
  if (userProgress.completedChallenges.length === Object.keys(challenges).length) {
    document.getElementById('certificate-btn').style.display = 'block';
  }
}

// Function to generate a detailed certificate
function generateCertificate() {
  const certificate = `
    --------------------------------------
      Certificate of Completion
    --------------------------------------
      Congratulations, ${userProgress.name}!
      
      You have successfully completed all the challenges in the 
      Advent of CTF event.
      
      Total Points: ${userProgress.totalPoints}
      Completed Challenges: ${userProgress.completedChallenges.join(', ')}
      
      You are now skilled in:
      - HTML Security
      - Python Programming
      - Cybersecurity Techniques

      Date of Completion: ${new Date().toLocaleDateString()}
    --------------------------------------
  `;
  const blob = new Blob([certificate], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `CTF_Certificate_${userProgress.name}.txt`;
  link.click();
}

// Function to save user profile
document.getElementById('profile-form').addEventListener('submit', function(e) {
  e.preventDefault();
  userProgress.name = document.getElementById('profile-name').value;
  alert("Profile saved! You can now start challenges.");
});