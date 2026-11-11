(function () {
  'use strict';

  const rankingBody = document.getElementById('ranking-body');
  if (!rankingBody) return;

  if (!Array.isArray(window.rankingData) || window.rankingData.length !== 10) {
    console.error('ランキングデータを読み込めませんでした。');
    return;
  }

  const medalClasses = {
    1: 'gold',
    2: 'silver',
    3: 'bronze'
  };

  rankingBody.innerHTML = window.rankingData.map(function (entry) {
    const rankClass = entry.rank <= 3 ? 'rank-row-top rank-' + entry.rank : 'rank-row';
    const medalClass = medalClasses[entry.rank] || 'normal';

    return `
      <tr class="${rankClass}">
        <td class="rank-badge-cell">
          <span class="rank-badge ${medalClass}">${entry.rank}</span>
        </td>
        <td class="rank-name-cell">
          <span class="rank-class-name">${entry.className}</span>
        </td>
        <td class="rank-pts-cell">
          <span class="rank-score-val">${entry.score}pts</span>
        </td>
      </tr>
    `;
  }).join('');
})();
