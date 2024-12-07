import { skipToMainContent } from "$digerati/skipToMainContent";
import { currentYear } from "$digerati/currentYear";
import { teamMemberModal } from "$a7architecture/teamMemberModal";

window.Webflow || [];
window.Webflow.push(() => {
  skipToMainContent();
  currentYear();
  teamMemberModal();
});