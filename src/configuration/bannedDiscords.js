/**
 * Configuration for banned Discord users and monitored channels
 * users: Array of user IDs that have PVP bans
 * channels: Array of channel IDs to monitor for mentions (empty array means check all channels)
 */
const bannedDiscords = {
    // List of user IDs with PVP bans
    users: [
        // Add more banned user IDs here
        '612605661506830336', // MOULI FTW
        '1302595885271879701', // JUDY JR
        '1019546272853663755', // Foxxzyyy
        '770531323696906270', // IDIVETTU COOPER
        '756169633534574718', // KADAVUL IDIVETTU
        '1022888490259714229', // DRUG
        '826111684036788255', // JOHN IDIVETTU
        '778988190652039179', // Ryan
        '728257055936348191', // ud1t
        '887577932036444242', // SPENCER
        '910140252251897876', // Roledox
        '787561783724212275', // BUNNY TOPG
        '1091293172681932830', // Nick
        '1241975122399723602', // CJAYYY
        '1344388901179228215', // samurai..2005
        '848773588001357854', // MR ZEUS
        '979748227064680478', // PyxelGeo
        '971402512034848848', // SCwarlordy
        '747794020058529862', // @tequilla404
        '1302595885271879701', // LOKI FTW
        '948259081137848332', // sahal3820
        '757619468972196004', // LIL BENZ
        '612259902962008074', // SpideY
        '762531396077879326', // Milo Sike
        '971402512034848848', // SCwarlordy
    ],

    // List of channel IDs to monitor (leave empty to monitor all channels)
    channels: [
        '1421775546035077156', // Staff Channel
        // Add more channel IDs to monitor here
    ]
}

module.exports = bannedDiscords;