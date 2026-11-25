(function () {
  'use strict';

  const rankingBody = document.getElementById('ranking-body');
  if (rankingBody) {
    if (!Array.isArray(window.rankingData) || window.rankingData.length !== 10) {
      console.error('ランキングデータを読み込めませんでした。');
    } else {
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
    }
  }

  const cosplayRankingBody = document.getElementById('rankingDataCosplay');
  if (cosplayRankingBody) {
    if (!Array.isArray(window.rankingDataCosplay) || window.rankingDataCosplay.length !== 3) {
      console.error('コスプレ大会のランキングデータを読み込めませんでした。');
      return;
    }

    cosplayRankingBody.innerHTML = window.rankingDataCosplay.map(function (entry) {
      const rankClass = 'cosplay-rank-' + entry.rank;

      return `
        <tr class="cosplay-ranking-row">
          <td class="cosplay-ranking-rank" data-label="順位">
            <span class="cosplay-rank-badge ${rankClass}">${entry.rank}位</span>
          </td>
          <td data-label="参加者名">${entry.name}</td>
          <td data-label="内容">${entry.naiyou}</td>
        </tr>
      `;
    }).join('');
  }
})();
