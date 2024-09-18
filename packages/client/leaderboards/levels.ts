import { Modules } from '@kaetram/common/network';

class Levels {
    /**
     * Responsible for loading hard-coded values into the global classes.
     */

    private maxLevel = 135;
    public levelExp: number[] = [];
    public constructor() {
        this.loadLevels();
    }

    /**

    0,         83,        174,       275,       387,       511,       648,      - Lvl 0-6
    799,       966,       1151,      1355,      1580,      1829,      2103,     - Lvl 7-13
    2406,      2740,      3109,      3517,      3967,      4463,      5011,     - Lvl 14-20
    5616,      6283,      7020,      7833,      8730,      9720,      10813,    - Lvl 21-27
    12020,     13352,     14822,     16444,     18235,     20212,     22394,    - Lvl 28-34
    24802,     27460,     30394,     33633,     37209,     41156,     45513,    - Lvl 35-41
    50323,     55633,     61495,     67966,     75110,     82996,     91702,    - Lvl 42-48
    101314,    111925,    123640,    136573,    150851,    166614,    184017,   - Lvl 49-55
    203231,    224443,    247862,    273718,    302264,    333780,    368575,   - Lvl 56-62
    406990,    449403,    496229,    547928,    605006,    668024,    737600,   - Lvl 63-69
    814417,    899228,    992866,    1096249,   1210391,   1336413,   1475551,  - Lvl 70-76
    1629170,   1798777,   1986037,   2192787,   2421055,   2673082,   2951341,  - Lvl 77-83
    3258562,   3597759,   3972261,   4385743,   4842262,   5346298,   5902797,  - Lvl 83-89
    6517219,   7195594,   7944579,   8771523,   9684541,   10692593,  11805570, - Lvl 90-96
    13034394,  14391123,  15889071,  17542938,  19368953,  21385034,  23610966, - Lvl 97-103
    26068592,  28782028,  31777902,  35085613,  38737619,  42769758,  47221598, - Lvl 104-110
    52136826,  57563675,  63555399,  70170796,  77474784,  85539037,  94442692, - Lvl 111-117
    104273121, 115126792, 127110214, 140340981, 154948930, 171077410,           - Lvl 118-123
    188884693, 208545524, 230252838, 254219653, 280681159, 309897028,           - Lvl 124-129
    342153959, 377768495, 417090128, 460504727                                  - Lvl 130-134

    **/

    /**
     * Loads the levels into the Formulas global class. The formula has been taken from RuneScape
     * experience formula. https://runescape.fandom.com/wiki/Experience
     */

    private loadLevels(): void {
        this.levelExp[0] = 0;

        for (let i = 1; i < Modules.Constants.MAX_LEVEL; i++) {
            let points = Math.floor(0.25 * Math.floor(i + 300 * Math.pow(2, i / 7)));
            this.levelExp[i] = points + this.levelExp[i - 1];
        }
    }

    public expToLevel(experience: number): number {
        if (experience < 0) return -1;

        for (let i = 1; i < this.levelExp.length; i++) if (experience < this.levelExp[i]) return i;

        return Modules.Constants.MAX_LEVEL;
    }
}

export const levels = new Levels();
