/**
 * Team Member Modal.
 * 
 * Dynamically populate Team Member Modal
 * with CMS Collection Item Properties
 * from corresponding Team Member Item.
 * 
 * @author <cabal@digerati.design>
 */
export const teamMemberModal = () => {
    const showModalLinks = document.querySelectorAll('[dd-modal="show"]'),
        modal = document.querySelector('[dd-modal="modal"]');
    if (!showModalLinks || !modal) {
        return;
    }
    showModalLinks.forEach((showModalLink) => {
        showModalLink.addEventListener('click', () => {
            let teamMember = showModalLink;
            if (!teamMember) {
                return false;
            }
            modal.querySelector(['[dd-modal="name"]']).innerText = teamMember.querySelector('[dd-tm="name"]').innerText;
            modal.querySelector(['[dd-modal="qualification"]']).innerText = teamMember.querySelector('[dd-tm="qualification"]').innerText;
            modal.querySelector(['[dd-modal="job-title"]']).innerText = teamMember.querySelector('[dd-tm="job-title"').innerText;
            modal.querySelector(['[dd-modal="image"]']).src = teamMember.querySelector('[dd-tm="image"]').src;
            modal.querySelector(['[dd-modal="biography"]']).innerHTML = teamMember.querySelector('[dd-tm="biography"]').innerHTML;
            modal.querySelector(['[dd-modal="fact-question"]']).innerHTML = teamMember.querySelector('[dd-tm="fact-question"]').innerHTML;
            modal.querySelector(['[dd-modal="fact-answer"]']).innerHTML = teamMember.querySelector('[dd-tm="fact-answer"]').innerHTML;
            /* Display email */
            let emailAddress = teamMember.querySelector('[dd-tm="email"]').href.trim();
            let emailElement = modal.querySelector(['[dd-modal="email"]']);
            if (!emailAddress.includes('#')) {
                emailElement?.classList.remove('hide');
                emailElement.href = emailAddress;
            } else {
                emailElement?.classList.add('hide');
            }
        }, { passive: true });
    });
};
