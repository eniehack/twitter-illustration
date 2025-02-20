import { sendMessage } from './request';

let registeredTweets: string[] = [];

const callback = () => {
  const plusButtonClassName = 'illustration-plus';

  // target a tweet page containing images
  const url = location.href;
  if (
    !url.includes('/status') ||
    !document.querySelector(
      '[data-testid="tweetPhoto"], [data-testid="swipe-to-dismiss"]'
    )
  ) {
    const existingPlusButtons =
      document.getElementsByClassName(plusButtonClassName);
    for (let i = 0; i < existingPlusButtons.length; i++) {
      existingPlusButtons[i].remove();
    }
    return;
  }

  // add a plus button
  const navigationQuery =
    '[data-testid="tweet"] .css-1dbjc4n.r-k4xj1c.r-18u37iz.r-1wtj0ep';
  const navigations = document.querySelectorAll(navigationQuery);
  if (navigations.length === 0) {
    return;
  }

  const id = url.replace(/^https:\/\/.*\/status\//, '').replace(/\/.*$/, '');
  const isAlreadyStored = registeredTweets.includes(id);

  for (let i = 0; i < navigations.length; i++) {
    if (navigations[i].getElementsByClassName(plusButtonClassName).length > 0) {
      continue;
    }

    const plusButton = document.createElement('div');
    plusButton.className = plusButtonClassName;
    plusButton.innerHTML = isAlreadyStored ? '✓' : '+';

    if (!isAlreadyStored) {
      const onClickPlusButton = async () => {
        const response = await sendMessage({
          type: 'add-tweet',
          body: { id },
        });
        if (response.succeeded) {
          registeredTweets.push(id);
          plusButton.innerHTML = '✓';
          plusButton.removeEventListener('click', onClickPlusButton);
        } else {
          alert(`Failed: ${response.message}`);
        }
      };
      plusButton.addEventListener('click', onClickPlusButton);
    }
    navigations[i].appendChild(plusButton);
    console.log(navigations[i]);
  }
};

window.addEventListener('load', async () => {
  // get stored tweets
  const storedTweetsResponse = await sendMessage({
    type: 'get-tweets',
  });
  if (storedTweetsResponse.succeeded) {
    registeredTweets = storedTweetsResponse.body as string[];
  }

  // register a observer
  const registerObserver = () => {
    const timeline = document.querySelector('#react-root');
    if (timeline) {
      const observer = new MutationObserver(callback);
      observer.observe(timeline, { childList: true, subtree: true });
      callback();
    } else {
      setTimeout(registerObserver, 100);
    }
  };
  registerObserver();
});
