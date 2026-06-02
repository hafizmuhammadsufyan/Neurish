/**
 * Generates developmental recommendations based on the child's profile details.
 * Implements a rule-based engine mapping concerns and age to article, activity, and milestone focuses.
 * 
 * @param {Object} child - Child profile object
 * @param {Array} articles - Available articles database
 * @param {Array} activities - Available activities database
 * @param {Object} milestones - Milestone definitions (toddler, preschool)
 * @returns {Object} Recommended resources
 */
export function getRecommendations({ child, articles, activities, milestones }) {
  if (!child) return { article: null, activity: null, milestoneCategory: 'Cognitive', focusText: 'General Development' };

  const dob = new Date(child.dob);
  const diffMs = Date.now() - dob.getTime();
  const ageDate = new Date(diffMs);
  const years = Math.abs(ageDate.getUTCFullYear() - 1970);
  const months = ageDate.getUTCMonth();
  const totalMonths = years * 12 + months;

  // Determine age group string for activities
  let activityAgeGroup = '0–1 Year';
  if (totalMonths >= 12 && totalMonths < 24) {
    activityAgeGroup = '1–2 Years';
  } else if (totalMonths >= 24 && totalMonths < 36) {
    activityAgeGroup = '2–3 Years';
  } else if (totalMonths >= 36 && totalMonths < 60) {
    activityAgeGroup = '3–5 Years';
  } else if (totalMonths >= 60) {
    activityAgeGroup = '5+ Years';
  }

  // Determine milestone age category
  const milestoneAgeCategory = years >= 3 ? 'preschool' : 'toddler';

  // Primary concern
  const primaryConcern = child.concerns && child.concerns.length > 0 ? child.concerns[0] : 'General Development';

  // Mapping concerns to categories
  let targetArticleCategory = 'Learning Through Play';
  let targetActivityCategory = 'Problem Solving';
  let targetMilestoneCategory = 'Cognitive';
  let focusText = 'Promote general cognitive development through guided play.';

  switch (primaryConcern) {
    case 'Screen Time':
      targetArticleCategory = 'Screen Time';
      targetActivityCategory = 'Creativity'; // alternative to screen
      targetMilestoneCategory = 'Cognitive';
      focusText = 'Reduce digital device usage and focus on real-world tactile actions.';
      break;
    case 'Speech Development':
    case 'Speech':
      targetArticleCategory = 'Communication';
      targetActivityCategory = 'Language';
      targetMilestoneCategory = 'Communication';
      focusText = 'Enhance communication via server-and-return descriptive talking.';
      break;
    case 'Sleep Issues':
      targetArticleCategory = 'Sleep';
      targetActivityCategory = 'Motor Skills'; // tire them out with physical play
      targetMilestoneCategory = 'Physical';
      focusText = 'Build a predictable calming wind-down routine for better circadian rhythm.';
      break;
    case 'Tantrums':
    case 'Behavior Challenges':
    case 'Excessive Crying':
      targetArticleCategory = 'Behavior';
      targetActivityCategory = 'Emotional Learning';
      targetMilestoneCategory = 'Emotional';
      focusText = 'De-escalate tantrums using emotional labeling and co-regulation.';
      break;
    case 'Emotional Regulation':
      targetArticleCategory = 'Emotional Development';
      targetActivityCategory = 'Emotional Learning';
      targetMilestoneCategory = 'Emotional';
      focusText = 'Help identify and label feelings to build emotional literacy.';
      break;
    case 'Social Skills':
      targetArticleCategory = 'Social Development';
      targetActivityCategory = 'Emotional Learning';
      targetMilestoneCategory = 'Social';
      focusText = 'Encourage turn-taking and interactive cooperative play.';
      break;
    case 'Learning & Attention':
      targetArticleCategory = 'Learning Through Play';
      targetActivityCategory = 'Problem Solving';
      targetMilestoneCategory = 'Cognitive';
      focusText = 'Strengthen memory and classification skills through guided play.';
      break;
    default:
      targetArticleCategory = 'Learning Through Play';
      targetActivityCategory = 'Problem Solving';
      targetMilestoneCategory = 'Cognitive';
      focusText = 'Support physical and mental development milestones.';
  }

  // Find recommended article
  let recommendedArticle = articles.find(
    (a) => a.category.toLowerCase() === targetArticleCategory.toLowerCase() && 
           (a.ageGroup === activityAgeGroup || a.ageGroup === 'All')
  );
  if (!recommendedArticle) {
    recommendedArticle = articles.find((a) => a.category.toLowerCase() === targetArticleCategory.toLowerCase()) || articles[0];
  }

  // Find recommended activity
  let recommendedActivity = activities.find(
    (act) => act.ageGroup === activityAgeGroup && act.category.toLowerCase() === targetActivityCategory.toLowerCase()
  );
  if (!recommendedActivity) {
    recommendedActivity = activities.find((act) => act.ageGroup === activityAgeGroup) || activities[0];
  }

  return {
    article: recommendedArticle,
    activity: recommendedActivity,
    milestoneCategory: targetMilestoneCategory,
    focusText: focusText,
    milestoneAgeCategory: milestoneAgeCategory
  };
}
