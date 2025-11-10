"""Commands related to general group discussions."""

import discord
import random
from discord.ext import commands

from amy.lib import logging

logger = logging.getLogger(__name__)
logger.debug(f"{__name__} initialization started")


class RoundtableCommands(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        logger.debug(f"{__name__} Cog initialized")

    @discord.app_commands.command(
        name="pickfrom", description="Pick from a list of options, or people"
    )
    @discord.app_commands.describe(options='List of options ("help" for more info)')
    async def pick_from(self, interaction: discord.Interaction, options: str = "help"):
        if options.lower() == "help":
            description = (
                "If you need to randomly pick from a list of options, I can help! "
                "I will automatically try to figure out if you're picking from a "
                "list of people or other options. If your options have spaces, "
                "separate them with commas."
            )
            embed = discord.Embed(
                title="How to use /pickfrom",
                description=description,
                color=discord.Color.random(),
            )
            await interaction.response.send_message(embed=embed, ephemeral=True)
            return

        if "@everyone" in options or "@here" in options:
            if isinstance(interaction.channel, discord.TextChannel):
                members = [
                    member for member in interaction.channel.members if not member.bot
                ]

                if "@here" in options:
                    members = [
                        member
                        for member in members
                        if member.status != discord.Status.offline
                    ]

                if len(members) == 0:
                    logger.error("pickfrom @everyone used but members list was empty!")
                    await interaction.response.send_message(
                        "Something weird happened, and there's no one to pick from!",
                        ephemeral=True,
                    )
                    return
                choice = random.choice(members)
                await interaction.response.send_message(
                    f"Out of everyone, I pick {choice.mention}!"
                )
                return
            else:
                await interaction.response.send_message(
                    "@everyone can only be used in text channels!", ephemeral=True
                )
                return
        elif (
            len(interaction.message.mentions) > 0
            or len(interaction.message.role_mentions) > 0
        ):
            members = set()
            for user in interaction.message.mentions:
                if not user.bot:
                    members.add(user)
            for role in interaction.message.role_mentions:
                if isinstance(interaction.channel, discord.TextChannel):
                    for member in role.members:
                        if not member.bot:
                            members.add(member)
            if len(members) == 0:
                logger.error(
                    "pickfrom mentioned users/roles but no valid members found!"
                )
                await interaction.response.send_message(
                    "I don't know who to choose! (I automatically ignore any bots that are mentioned.)",
                    ephemeral=True,
                )
                return
            choice = random.choice(members)
            await interaction.response.send_message(
                f"From everyone that was mentioned, I pick {choice.mention}!"
            )
            return
        elif "," in options:
            options = [option.strip() for option in options.split(",")]
        else:
            options = [option.strip() for option in options.split()]
        choice = random.choice(options)
        await interaction.response.send_message(
            f"Out of the options you presented, I pick {choice}!"
        )
