document.addEventListener('DOMContentLoaded', function () {
  
  $('body').on('click', '.dropdown-item', function () {
    //alert(434);
  });

  const excerciseHtml = (e) => {
    const html = `
        <div class='excercise'>
            <span class='name'>${e.name}</span>
            <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0.5C12.6025 0.5 13.0909 0.891751 13.0909 1.375V20.625C13.0909 21.1082 12.6025 21.5 12 21.5C11.3975 21.5 10.9091 21.1082 10.9091 20.625V1.375C10.9091 0.891751 11.3975 0.5 12 0.5Z" fill="#6750A4"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.72727 20.3947C8.72727 19.7843 9.09359 19.2895 9.54545 19.2895H14.4545C14.9064 19.2895 15.2727 19.7843 15.2727 20.3947C15.2727 21.0052 14.9064 21.5 14.4545 21.5H9.54545C9.09359 21.5 8.72727 21.0052 8.72727 20.3947Z" fill="#6750A4"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.7063 2.32666C20.8109 2.82319 20.5142 3.31516 20.0437 3.4255L4.33494 7.10945C3.86443 7.21979 3.39825 6.90672 3.2937 6.41018C3.18914 5.91365 3.4858 5.42168 3.95631 5.31134L19.6651 1.62739C20.1356 1.51705 20.6017 1.83012 20.7063 2.32666Z" fill="#6750A4"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.36364 6.02632C4.7205 6.02632 5.04141 6.24644 5.17394 6.58214L8.66485 15.4242C8.70609 15.5287 8.72727 15.6401 8.72727 15.7526C8.72727 17.133 7.93268 18.0492 7.03938 18.5765C6.17206 19.0886 5.14101 19.2895 4.36364 19.2895C3.58626 19.2895 2.55522 19.0886 1.68789 18.5765C0.794592 18.0492 0 17.133 0 15.7526C0 15.6401 0.0211856 15.5287 0.0624203 15.4242L3.55333 6.58214C3.68587 6.24644 4.00677 6.02632 4.36364 6.02632ZM1.75266 15.9047C1.80084 16.4019 2.08917 16.7667 2.56665 17.0486C3.11751 17.3738 3.83192 17.5211 4.36364 17.5211C4.89536 17.5211 5.60976 17.3738 6.16062 17.0486C6.6381 16.7667 6.92643 16.4019 6.97462 15.9047L4.36364 9.29134L1.75266 15.9047Z" fill="#6750A4"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.6364 1.60526C19.9932 1.60526 20.3141 1.82539 20.4467 2.16109L23.9376 11.0032C23.9788 11.1076 24 11.2191 24 11.3316C24 12.7119 23.2054 13.6281 22.3121 14.1555C21.4448 14.6675 20.4137 14.8684 19.6364 14.8684C18.859 14.8684 17.8279 14.6675 16.9606 14.1555C16.0673 13.6281 15.2727 12.7119 15.2727 11.3316C15.2727 11.2191 15.2939 11.1076 15.3351 11.0032L18.8261 2.16109C18.9586 1.82539 19.2795 1.60526 19.6364 1.60526ZM17.0254 11.4836C17.0736 11.9808 17.3619 12.3457 17.8394 12.6275C18.3902 12.9527 19.1046 13.1 19.6364 13.1C20.1681 13.1 20.8825 12.9527 21.4333 12.6275C21.9108 12.3457 22.1992 11.9808 22.2473 11.4836L19.6364 4.87028L17.0254 11.4836Z" fill="#6750A4"/>
            </svg>
            <span class='name'>${e.weight}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.655 1.02459C20.0155 0.658471 20.5999 0.658471 20.9604 1.02459L23.7296 3.83709C24.0901 4.2032 24.0901 4.7968 23.7296 5.16291L20.9604 7.97541C20.5999 8.34153 20.0155 8.34153 19.655 7.97541C19.2945 7.6093 19.2945 7.0157 19.655 6.64959L21.7715 4.5L19.655 2.35041C19.2945 1.9843 19.2945 1.3907 19.655 1.02459Z" fill="#6750A4"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.30625 3.5625L8.30769 3.5625L23.0769 3.5625C23.5867 3.5625 24 3.98223 24 4.5C24 5.01777 23.5867 5.4375 23.0769 5.4375H8.30845C6.59543 5.4404 4.95337 6.1328 3.74207 7.36304C2.5306 8.59343 1.84882 10.2614 1.84615 12.0015C1.84536 12.5192 1.43144 12.9383 0.921638 12.9375C0.411837 12.9367 -0.000793544 12.5163 1.15975e-06 11.9985C0.00343362 9.76223 0.879656 7.61852 2.43664 6.03721C3.99362 4.4559 6.10435 3.56599 8.30625 3.5625Z" fill="#6750A4"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.34502 16.0246C4.70551 16.3907 4.70551 16.9843 4.34502 17.3504L2.2285 19.5L4.34502 21.6496C4.70551 22.0157 4.70551 22.6093 4.34502 22.9754C3.98454 23.3415 3.40008 23.3415 3.03959 22.9754L0.270363 20.1629C-0.090121 19.7968 -0.090121 19.2032 0.270363 18.8371L3.03959 16.0246C3.40008 15.6585 3.98454 15.6585 4.34502 16.0246Z" fill="#6750A4"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M23.0784 11.0625C23.5882 11.0633 24.0008 11.4837 24 12.0015C23.9966 14.2378 23.1203 16.3815 21.5634 17.9628C20.0064 19.5441 17.8956 20.434 15.6937 20.4375H0.923077C0.413276 20.4375 1.37549e-08 20.0178 1.37549e-08 19.5C1.37549e-08 18.9822 0.413276 18.5625 0.923077 18.5625H15.6917C17.4047 18.5596 19.0467 17.8672 20.2579 16.637C21.4694 15.4066 22.1512 13.7386 22.1538 11.9985C22.1546 11.4808 22.5686 11.0617 23.0784 11.0625Z" fill="#6750A4"/>
            </svg>
            <span class='name'>${e.reps}</span>
            <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11 5.14286C6.16751 5.14286 2.25 8.98042 2.25 13.7143C2.25 18.4482 6.16751 22.2857 11 22.2857C15.8325 22.2857 19.75 18.4482 19.75 13.7143C19.75 8.98042 15.8325 5.14286 11 5.14286ZM0.5 13.7143C0.5 8.03364 5.20101 3.42857 11 3.42857C16.799 3.42857 21.5 8.03364 21.5 13.7143C21.5 19.3949 16.799 24 11 24C5.20101 24 0.5 19.3949 0.5 13.7143Z" fill="#6750A4"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.95 8.86538C16.2917 9.20011 16.2917 9.74283 15.95 10.0776L11.6187 14.3204C11.277 14.6552 10.723 14.6552 10.3813 14.3204C10.0396 13.9857 10.0396 13.443 10.3813 13.1082L14.7125 8.86538C15.0542 8.53064 15.6083 8.53064 15.95 8.86538Z" fill="#6750A4"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 0.857143C7.5 0.383756 7.89175 0 8.375 0H13.625C14.1082 0 14.5 0.383756 14.5 0.857143C14.5 1.33053 14.1082 1.71429 13.625 1.71429H8.375C7.89175 1.71429 7.5 1.33053 7.5 0.857143Z" fill="#6750A4"/>
            </svg>
            <span class='name'>${e.time}</span>

        </div>
    `;
    return html;
  };

  const setPartHtml = (p, deleteExecrcise) => {
    if (deleteExecrcise) {
    }
  };

  const setTopHtml = (s) => {
    if (s.closed) {
      return `
        <div class='set_top'>
          <div class='top_left'>
            <span class='button_icon'>${setShowRepsIcon}</span>
            Сет <span class='rep_button'>${s.reps} ${repIcon}</span>
          </div>
          <div class='top_right'>
            <span class='button_icon'>${showSetIcon}</span>
            <span class='button_icon'>${deleteIcon}</span>
          </div>
        </div>
      `;
    }else{
      if(s.showReps)
    }
  };


});
